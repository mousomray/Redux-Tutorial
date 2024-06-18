import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from '@tanstack/react-query' // Import for useQuery 
import { Link } from "react-router-dom";
import { addToCart } from "../apicall/cartslice";
import { showproduct } from "../apicall/productapicall";
import Layout from "../Common/Layout";

// Loading Skeleton 
import Skeleton from 'react-loading-skeleton';

// Import for MUI Grid  
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

// Import For MUI Card 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Categories from "./Categories";
import { Pagination } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Product = () => {
    const dispatch = useDispatch();
    const [page, setPage] = useState(1);
    const itemsPerPage = 3;


    // Get Product For Use Query 
    const getProductdata = async () => {
        const response = await dispatch(showproduct()) // Call showproduct function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: productdata, error, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: getProductdata // This line of code work as same as useEffect()
    })

    console.log("Product data response", productdata);

    // Calculate total pages
    const totalPages = Math.ceil(productdata?.length / itemsPerPage);

    // Get current page data
    const currentPageData = productdata?.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    // handle For Page Change
    const handleChangePage = (event, value) => {
        setPage(value);
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    };

    return (
        <>
            <Layout>
                <div className='container mt-5'>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Item>
                                    {/* Display Skeleton or Categories */}
                                    {isLoading ? <Skeleton height={200} count={5} /> : <Categories />}
                                </Item>
                            </Grid>
                            <Grid container item xs={12} sm={8} spacing={2}>
                                {isLoading ? (
                                    // Display Skeletons while loading
                                    Array.from(Array(10).keys()).map((index) => (
                                        <Grid key={index} item xs={12} sm={6} md={4}>
                                            <Card sx={{ maxWidth: 345, flexGrow: 1 }}>
                                                <Skeleton height="100%" width="100%" />
                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    // Display actual products
                                    currentPageData?.map((value, index) => (
                                        <Grid key={index} item xs={12} sm={6} md={4}>
                                            <Card sx={{ maxWidth: 345, flexGrow: 1, height: 500 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="200"
                                                        image={value?.thumbnail}
                                                        alt="product thumbnail"
                                                    />
                                                    <CardContent>
                                                        <Typography gutterBottom variant="h5" component="div">
                                                            {value?.title}
                                                        </Typography>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {value?.description}
                                                        </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Link to={`/productdetails/${value?.id}`}>
                                                        <Button size="small" color="primary">
                                                            Details
                                                        </Button>
                                                    </Link>
                                                    <Button size="small" color="primary" onClick={() => handleAddToCart(value)}>
                                                        Add to Cart
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                )}
                            </Grid>
                        </Grid>

                        {/* Pagination Indicator*/}
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={handleChangePage}
                            color="primary"
                            style={{ display: 'flex', justifyContent: 'center' }}
                        />

                    </Box>
                </div>
            </Layout>
        </>
    );
};

export default Product;
