import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showUser } from "../features/userDetailSlice";


const Read = () => {
    const dispatch = useDispatch();

    const { users, loading } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(showUser());
    }, []);

    if (loading) {
        return <h2>Loading</h2>;
    }

    return (
        <>

            <h2>All data</h2>

            <div>
                {Array.isArray(users) && users?.slice(0, users.length).reverse().map((value) => (
                    <div key={value.id} className="card w-50 mx-auto my-2">
                        <div className="card-body">
                            <img src={value?.thumbnail} alt="" style={{ height: '200px',width:'100%' }} />
                            <h5 className="card-title">{value.title}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{value.description}</h6>
                            <p className="card-text">Price : {value.price}</p>
                            <Link to={`/details/${value.id}`}><button className="btn-success">Details</button></Link>

                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Read;
