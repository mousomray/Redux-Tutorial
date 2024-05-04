import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailsuser } from "../features/userDetailSlice";


const Details = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const { users, loading } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(detailsuser(id));
    }, []);

    if (loading) {
        return <h2>Loading</h2>;
    }

    return (
        <>
            <h2>Details</h2>

            <div>

                <div className="card w-50 mx-auto my-2">
                    <div className="card-body">
                        <img src={users?.thumbnail} alt="" style={{ height: '200px',width:'100%' }} />
                        <h5 className="card-title">Title : {users.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">Description : {users.description}</h6>
                        <p className="card-text">Price : {users.price}</p>
                        <p className="card-text">Rating : {users.rating}</p>
                        <p className="card-text">Stock : {users.stock}</p>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Details;
