import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { detailsproduct } from "../features/prodetails"
import Layout from "../Common/Layout"


const Details = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    

    const { singleproduct, loading } = useSelector((state) => state.pdetails);

    useEffect(() => {
        dispatch(detailsproduct(id));
    }, []);

    if (loading) {
        return (
            <div class="spinner-grow text-primary" role="status" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize:'100000px'}}>
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
                                    {singleproduct?.images?.map((image, index) => (
                                        <li key={index} data-target="#productCarousel" data-slide-to={index} className={index === 0 ? 'active' : ''}></li>
                                    ))}
                                </ol>
                                <div className="carousel-inner">
                                    {singleproduct?.images?.map((image, index) => (
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
                                    <h5 className="card-title" style={{ color: 'blue' }}>Title: {singleproduct.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Description: {singleproduct.description}</h6>
                                    <p className="card-text">Price: {singleproduct.price}</p>
                                    <p className="card-text">Rating: {singleproduct.rating}</p>
                                    <p className="card-text">Stock: {singleproduct.stock}</p>
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