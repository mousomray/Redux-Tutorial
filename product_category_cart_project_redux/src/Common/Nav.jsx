import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
    
    // For to show number of cart
    const cartItems = useSelector((state) => state.cart);

    const navbarStyle = {
        backgroundColor: '#343a40',
        padding: '15px 0',
        marginBottom: '20px',
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginRight: '20px',
    };

    const cartLinkStyle = {
        color: 'white',
        textDecoration: 'none',
        marginRight: '20px',
        position: 'relative',
    };

    const cartItemCountStyle = {
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '5px 10px',
        position: 'absolute',
        top: '-10px',
        right: '-10px',
    };

    return (
        <nav style={navbarStyle}>
            <div className="container">
                <ul className="list-unstyled d-flex justify-content-between align-items-center mb-0">
                    <li>
                        <Link to="/" style={linkStyle}>Home</Link>
                    </li>
                    <li>
                        <Link to="/cart" style={cartLinkStyle}>
                            Cart ({cartItems.length})
                            {cartItems.length > 0 && <span style={cartItemCountStyle}>{cartItems.length}</span>}
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
