import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../Context/Myauth';
import { toast } from 'react-toastify';

const Nav = () => {
    const [auth, setAuth] = useAuth(); // Create custom hook

    // Make handle for Logout
    const handleLogout = () => {
        setAuth({
            ...auth, user: null, token: ''
        });
        localStorage.removeItem('auth');
        toast.success('Successfully logout');
    };

    // This is what we're doing so that even after refreshing the page, the logout button doesn't disappear.
    useEffect(() => {
        const authData = JSON.parse(localStorage.getItem('auth'));
        if (authData) {
            setAuth(authData);
        }
    }, []);

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink exact className="nav-link" activeClassName="active" to="/showproduct">Showproduct</NavLink>
                            </li>
                            {!auth.user ? (
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active" to="/login">Login</NavLink>
                                </li>
                            ) : (
                                <li className="nav-item">
                                    <NavLink className="nav-link" activeClassName="active" to="/login" onClick={handleLogout}>Logout</NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>


        </>
    );
};

export default Nav;
