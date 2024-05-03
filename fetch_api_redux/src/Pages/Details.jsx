import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { detailsuser } from "../features/userDetailSlice";
//import CustomModal from "./CustomModal";

const Details = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    // const [id, setId] = useState();

    // const [radioData, setRadioData] = useState("");

    // const [showPopup, setShowPopup] = useState(false);

    const { users, loading } = useSelector((state) => state.app);

    useEffect(() => {
        dispatch(detailsuser(id));
    }, []);

    if (loading) {
        return <h2>Loading</h2>;
    }

    return (
        <>
            <h1>{users?.title}</h1>
        </>
    );
};

export default Details;
