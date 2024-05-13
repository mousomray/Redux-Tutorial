import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartslice";
import { showProduct } from "../features/productDetailsslice";
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

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Product = () => {
    const dispatch = useDispatch();
    const [visibleCards, setVisibleCards] = useState(6);
    const { products, loading } = useSelector((state) => state.product);

    useEffect(() => {
        dispatch(showProduct());
    }, [dispatch]);

    const handleLoadMore = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 6);
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
                                    {loading ? <Skeleton height={200} count={5} /> : <Categories />}
                                </Item>
                            </Grid>
                            <Grid container item xs={12} sm={8} spacing={2}>
                                {loading ? (
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
                                    products?.slice(0, visibleCards).map((value, index) => (
                                        <Grid key={index} item xs={12} sm={6} md={4}>
                                            <Card sx={{ maxWidth: 345, flexGrow: 1 }}>
                                                <CardActionArea>
                                                    <CardMedia
                                                        component="img"
                                                        height="140"
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
                    </Box>
                    {visibleCards < products.length && (
                        <div className="text-center mt-5">
                            <button className="btn btn-primary" onClick={handleLoadMore}>Load More</button>
                        </div>
                    )}
                </div>
            </Layout>
        </>
    );
};

export default Product;
