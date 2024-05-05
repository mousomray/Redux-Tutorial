import React from 'react';
import Layout from '../Common/Layout';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../features/userDetailSlice';
import { useState } from 'react';
import { useAuth } from '../Context/Myauth';

const myobjects = {
    email: '',
    password: ''
};

const Login = () => {
    const [logi, setLogin] = useState(myobjects); // I take it for set validation
    const [auth, setAuth] = useAuth();
    const { loading } = useSelector((state) => state.app);
    const navigate = useNavigate();
    const [error, setError] = useState({}); // State for validation
    const dispatch = useDispatch(); // Dispatch function

    const validation = () => {
        let error = {};

        // For Email
        if (!logi.email) {
            error.email = "Email is Required";
        }

        // For Password
        if (!logi.password) {
            error.password = "Password is Required";
        }

        return error;
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setLogin({ ...logi, [name]: value });

        // For Email 
        if (name === 'email') {
            if (value.length === 0) {
                setError({ ...error, email: 'Email is Required' })
                setLogin({ ...logi, email: '' })
            } else {
                setError({ ...error, email: '' })
                setLogin({ ...logi, email: value })
            }
        }

        // For Password 
        if (name === 'password') {
            if (value.length === 0) {
                setError({ ...error, password: 'Password is Required' })
                setLogin({ ...logi, password: '' })
            } else {
                setError({ ...error, password: '' })
                setLogin({ ...logi, password: value })
            }
        }
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        let ErrorList = validation();
        setError(validation());

        if (Object.keys(ErrorList).length === 0) {
            try {
                const response = await dispatch(login(logi));
                if (response.payload && response.payload.status === 200) {

                    // Store user data and token in local storage

                    // Akhane joto guli data ache (In local storage handle) sab e ache jehetu api te data ache bole. data r jaygay jodi user ba onno kichu thakto tahole data r jaygay amra seta likhtam
                    const { data, token } = response.payload;
                    setAuth({ user: data, token });
                    localStorage.setItem("auth", JSON.stringify({ user: data, token }));

                    // Local storage end

                    navigate('/');
                }
            } catch (error) {
                console.error("Can't do navigate:", error);
            }
        }
    };

    return (
        <>
            <Layout>
                <form method='post' onSubmit={handleOnSubmit} style={{ maxWidth: '400px', margin: 'auto', marginTop: '50px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="exampleInputEmail1" style={{ display: 'block', marginBottom: '5px' }}>Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' onChange={handleOnChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        <span style={{ display: 'block', color: 'red', marginTop: '5px' }}>{error.email}</span>
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="exampleInputPassword1" style={{ display: 'block', marginBottom: '5px' }}>Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name='password' onChange={handleOnChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                        <span style={{ display: 'block', color: 'red', marginTop: '5px' }}>{error.password}</span>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff' }}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                    <Link to="/register" style={{ display: 'block', textAlign: 'center', marginTop: '20px', color: '#007bff', textDecoration: 'none' }}>You don't have an account? Register now</Link>
                </form>

            </Layout>
        </>
    );
};

export default Login;
