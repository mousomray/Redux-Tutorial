import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { showCategories } from '../features/categoryDetailsslice';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';

const Categories = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.category);

    useEffect(() => {
        dispatch(showCategories());
    }, []);

    if (loading) {
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
                {categories?.map((value) => {
                    return (
                        <>
                            <Link key={value} style={{ textDecoration: 'none' }} to={`/categorydetails/${value}`}>
                                <li>{value}</li>
                            </Link>
                        </>
                    )
                })}
            </ul>
        </div>
    );
};

export default Categories;
