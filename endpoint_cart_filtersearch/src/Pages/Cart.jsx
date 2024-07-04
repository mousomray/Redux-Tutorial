import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { removeCartItem, incrementQuantity, decrementQuantity } from './cartslice';
import Wrapper from '../Common/Wrapper';

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart);

    const handleRemoveFromCart = (itemId) => {
        dispatch(removeCartItem(itemId));
    };

    const handleIncrement = (itemId) => {
        dispatch(incrementQuantity({ id: itemId }));
    };

    const handleDecrement = (itemId) => {
        dispatch(decrementQuantity({ id: itemId }));
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <Wrapper>
            <div className='container' style={{marginTop:'100px'}}>
                <h1>Shopping Cart</h1>
                {cartItems.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Image</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item.id}>
                                        <td><img src={item.image} alt={item.title} style={{ height: '60px', borderRadius: '5%' }} /></td>
                                        <td>{item.title}</td>
                                        <td>{item.description}</td>
                                        <td>${item.price.toFixed(2)}</td>
                                        <td>{item.quantity}</td>
                                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                                        <td>
                                            <button className="btn btn-sm btn-primary me-2" onClick={() => handleIncrement(item.id)}>+</button>
                                            <button className="btn btn-sm btn-secondary" onClick={() => handleDecrement(item.id)}>-</button>
                                            <button className="btn btn-sm btn-danger ms-2" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="text-end mb-4">
                            <strong>Total Price: ${getTotalPrice().toFixed(2)}</strong>
                        </div>
                        <Link to='/product'>
                            <button className="btn btn-primary">Continue Shopping</button>
                        </Link>
                    </>
                )}
            </div>
        </Wrapper>
    );
};

export default Cart;