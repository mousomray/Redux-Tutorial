import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { singleproduct } from './allreducers'
import Wrapper from '../Common/Wrapper'

const Productdetails = () => {

    const { id } = useParams();
    const dispatch = useDispatch();

    // Get Product For Use Query 
    const getSingleProductdata = async () => {
        const response = await dispatch(singleproduct(id)) // Call Product function
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: singleproductdata, error, refetch } = useQuery({
        queryKey: ['singleproduct'],
        queryFn: getSingleProductdata // This line of code work as same as useEffect()
    })

    return (
        <>
            <Wrapper>

                <div className='container' style={{ marginTop: '150px' }}>
                    <img src={singleproductdata?.image} alt="" style={{height:'300px'}} />
                    <h1>{singleproductdata?.title}</h1>
                    <p><b>Price :</b> {singleproductdata?.price}</p>
                    <p><b>Description :</b> {singleproductdata?.description}</p>
                    <Link rel="stylesheet" to="/product" >
                        <button className='btn-primary'>
                            Back to Product
                        </button>
                    </Link> 
                </div>

            </Wrapper>
        </>
    )
}

export default Productdetails
