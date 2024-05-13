import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { cdetails } from '../features/categoryfilter';
import { Link } from 'react-router-dom';
import { addToCart } from "../features/cartslice";

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
import Categories from './Categories';
import Layout from '../Common/Layout';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Categorydetails = () => {

    const dispatch = useDispatch();
    const { category } = useParams();

    const { myfilter, loading } = useSelector((state) => state.cfilter);

    useEffect(() => {
        dispatch(cdetails(category));
    }, [category]); // I pass category here for to avoid page refreshing

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
                                    <Categories />
                                </Item>
                            </Grid>
                            <Grid container item xs={12} sm={8} spacing={2}>
                                {loading ? (
                                    // Display Skeletons while loading
                                    Array.from(Array(10).keys()).map((index) => (
                                        <Grid key={index} item xs={12} sm={6} md={4} style={{ display: 'flex' }}>
                                            <Card sx={{ maxWidth: 345, flexGrow: 1 }}>
                                                <Skeleton height="100%" width="100%" />
                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    // Display actual products
                                    myfilter?.map((value, index) => {
                                        return (
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
                                                        <Link to={`/productdetails/${value?.id}`} style={{ textDecoration: 'none' }}>
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
                                        )
                                    })
                                )}
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Layout>
        </>
    )
}

export default Categorydetails;
