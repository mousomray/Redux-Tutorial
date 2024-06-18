import React from "react";
import { useQuery } from '@tanstack/react-query' // Import for useQuery 
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsproduct } from "../apicall/productapicall"
import Layout from "../Common/Layout"


const Details = () => {
    const { id } = useParams();
    const dispatch = useDispatch();


    // Get Single Product For Use Query 
    const getSingleproductdata = async () => {
        const response = await dispatch(detailsproduct(id)) // Call Showproduct function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: singleproductdata, error, refetch } = useQuery({
        queryKey: ['singleproduct'],
        queryFn: getSingleproductdata // This line of code work as same as useEffect()
    })

    if (isLoading) {
        return (
            <div class="spinner-grow text-primary" role="status" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '100000px' }}>
                <span class="sr-only">Loading...</span>
            </div>
        );
    }


    return (
        <>
            <Layout>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <div style={{ width: '80%', maxWidth: '1200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ width: '50%' }}>
                            <div id="productCarousel" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    {singleproductdata?.images?.map((image, index) => (
                                        <li key={index} data-target="#productCarousel" data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                                    ))}
                                </ol>
                                <div className="carousel-inner">
                                    {singleproductdata?.images?.map((image, index) => (
                                        <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                            <img src={image} className="d-block w-100" style={{ height: '300px', objectFit: 'cover' }} alt='' />
                                        </div>
                                    ))}
                                </div>
                                <a className="carousel-control-prev" href="#productCarousel" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#productCarousel" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        </div>
                        <div style={{ width: '50%', paddingLeft: '20px' }}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title" style={{ color: 'blue' }}>Title: {singleproductdata.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Description: {singleproductdata.description}</h6>
                                    <p className="card-text">Price: {singleproductdata.price}</p>
                                    <p className="card-text">Rating: {singleproductdata.rating}</p>
                                    <p className="card-text">Stock: {singleproductdata.stock}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
};

export default Details;