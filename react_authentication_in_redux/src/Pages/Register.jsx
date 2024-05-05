import React, { useState } from 'react'
import Layout from '../Common/Layout'
import { useSelector, useDispatch } from 'react-redux'
import { register } from '../features/userDetailSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [reg, setReg] = useState([]);
    const [image, setImage] = useState();
    const { loading } = useSelector((state) => state.app);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setReg({ ...reg, [name]: value })
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await dispatch(register(reg));
            if (response.payload && response?.payload.status === 200) {
                navigate("/login");
            }
        } catch (error) {
            console.log("Error", error);
        }

    };


    return (
        <>
            <Layout>
                <form method='post' onSubmit={handleOnSubmit} style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="exampleInputEmail1" style={{ display: 'block', marginBottom: '5px' }}>First Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='first_name' onChange={handleOnChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="exampleInputEmail1" style={{ display: 'block', marginBottom: '5px' }}>Last Name</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='last_name' onChange={handleOnChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="exampleInputEmail1" style={{ display: 'block', marginBottom: '5px' }}>Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleOnChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="exampleInputPassword1" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleOnChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                    </div>
                    {/*This form section is for the submit image*/}
                    <div style={{ marginBottom: '20px' }}>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} name="image" accept="image/*" className="form-control" />
                        
                        {image !== "" && image !== undefined && image !== null ? (
                            <img style={{ height: "180px" }} src={URL.createObjectURL(image)} alt="" className="upload-img" />
                        ) : (
                            <>{image === "" && <p style={{ color: 'white' }}>Drag or drop content here</p>}</>
                        )}
                    </div>
                    {/*Image area end*/}
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff' }}>
                        {loading?'Loading...':'Register'}
                    </button>
                </form>

            </Layout>
        </>
    )
}

export default Register
