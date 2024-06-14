import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { allproduct } from './myslice';
import { Button } from '@mui/material';
import Wrapper from '../Common/Wrapper';
import { useQuery } from '@tanstack/react-query' // Import for useQuery 

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Product = () => {

    const dispatch = useDispatch()

    // Get Product For Use Query 
    const getProductdata = async () => {
        const response = await dispatch(allproduct()) // Call Showproduct function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: productdata, error, refetch } = useQuery({
        queryKey: ['product'],
        queryFn: getProductdata // This line of code work as same as useEffect()
    })

    // For Loading 
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>Loading...</h1>
            </div>
        )

    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <Wrapper>

                <div className='container' style={{ marginTop: '100px' }}>
                    <h1 className='mb-5' style={{ textAlign: 'center' }}>All products</h1>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} justifyContent="center">
                            {productdata.length !== 0 ? (
                                productdata?.map((value) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={value._id}>
                                        <Card sx={{
                                            maxWidth: 345,
                                            border: '1px solid black',
                                            borderRadius: '10px',
                                            overflow: 'hidden',
                                            height: '500px'
                                        }}>
                                            <CardActionArea>
                                                <CardMedia
                                                    component="img"
                                                    height="350"
                                                    image={value?.thumbnail
                                                    }
                                                    alt="trainer"
                                                />
                                                <CardContent>
                                                    <Typography gutterBottom variant="h5" component="div">
                                                        {value?.title}
                                                    </Typography>
                                                    <Typography gutterBottom variant="p" component="div">
                                                        Price: {value?.price}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Grid>
                                ))
                            )
                                :
                                (
                                    <>
                                        <p >No Data Found</p>
                                    </>
                                )}

                        </Grid>
                    </Box>
                </div>
            </Wrapper>
        </>
    )
}

export default Product
