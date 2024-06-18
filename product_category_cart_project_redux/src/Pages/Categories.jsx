import React from 'react';
import { useQuery } from '@tanstack/react-query' // Import for useQuery 
import { useSelector, useDispatch } from 'react-redux';
import { showcategories } from '../apicall/productapicall';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Categories = () => {
    const dispatch = useDispatch();
    
    // Get Product For Use Query 
    const getCategoriesdata = async () => {
        const response = await dispatch(showcategories()) // Call Showproduct function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: categoriesdata, error, refetch } = useQuery({
        queryKey: ['categories'],
        queryFn: getCategoriesdata // This line of code work as same as useEffect()
    })

    
    
    if (isLoading) {
        // Display Skeleton while loading
        return (
            <div style={{ fontSize: '20px' }}>
                <h1><Skeleton width={150} /></h1>
                <ul>
                    <li><Skeleton width={100} /></li>
                    <li><Skeleton width={100} /></li>
                    <li><Skeleton width={100} /></li>
                    <li><Skeleton width={100} /></li>
                </ul>
            </div>
        );
    }

    return (
        <div style={{ fontSize: '20px' }}>
            <h1>Categories</h1>
            <ul>
                <Link to="/" style={{ textDecoration: 'none' }}><li>All</li></Link>
                {categoriesdata?.map((value) => {
                    return (
                        <>
                            <Link key={value} style={{ textDecoration: 'none' }} to={`/categorydetails/${value.slug}`}>
                                <li>{value.name}</li>
                            </Link>
                        </>
                    )
                })}
            </ul>
        </div>
    );
};

export default Categories;
