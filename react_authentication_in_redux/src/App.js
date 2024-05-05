import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Register from './Pages/Register'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Login';
import { Navigate } from 'react-router-dom';
import Showproduct from './Pages/Showproduct';

const App = () => {

    // Create Function for private routing
    function PrivateRoute({ children }) {
        const token = localStorage.getItem("auth") || sessionStorage.getItem("auth");
        return token !== null && token !== undefined ? (
            children
        ) : (
            <Navigate to="/login" />
        );
    }


    // Private Routing 
    const private_routing = [
        {
            path: '/',
            component: <Home />
        },
        {
            path: '/showproduct',
            component: <Showproduct/>
        }
    ]

    // Private Routing 
    const public_routing = [
        {
            path: '/register',
            component: <Register />
        },
        {
            path: '/login',
            component: <Login />
        }
    ]

    return (
        <>
            <ToastContainer />

            <Router>
                <Routes>

                    {/*Private Routing Area */}
                    {private_routing?.map((routing) => {
                        return (
                            <>
                                <Route path={routing?.path} element={<PrivateRoute>{routing?.component}</PrivateRoute>} />
                            </>
                        )
                    })}

                    {/*Public Routing Area */}
                    {public_routing?.map((routing) => {
                        return (
                            <>
                                <Route path={routing.path} element={routing.component} />
                            </>
                        )
                    })}


                </Routes>
            </Router>
        </>
    )
}

export default App
