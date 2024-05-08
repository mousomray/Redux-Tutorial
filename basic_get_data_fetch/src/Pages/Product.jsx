import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showProduct } from "../Reducer/Productslice"; // This is the main function which is call your api

const Product = () => {
    const dispatch = useDispatch();
    const { products } = useSelector((state) => state?.myproduct); // myproduct is store reducer name

    useEffect(() => {
        dispatch(showProduct()); // Call showProduct() function 
    }, []);

    console.log('jj',products);

   

    return (
        <>
            <h2>All data</h2>
            <div>
                {products?.map((value) => (
                    <div key={value.id} className="card w-50 mx-auto my-2">
                        <div className="card-body">
                            <h5 className="card-title">{value.category}</h5>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Product;
