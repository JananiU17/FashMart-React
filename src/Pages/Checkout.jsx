import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CSS/Checkout.css';

const Checkout = () => {
    const { getTotalCartAmount, cartItems, all_product } = useContext(ShopContext);
    const navigate = useNavigate();

    const [address, setAddress] = useState({
        firstName: '', lastName: '', street: '', city: '', state: '', zipCode: '', phone: ''
    });

    useEffect(() => {
        // Wait for products to finish fetching first to calculate the real cart size
        if (all_product.length > 0) {
            if (!localStorage.getItem('auth-token')) {
                toast.warn("Please log in to checkout.");
                navigate('/login');
            } else if (getTotalCartAmount() === 0) {
                toast.info("Your cart is empty! Add products to proceed.");
                navigate('/cart');
            }
        }
    }, [all_product, navigate, getTotalCartAmount]);

    const changeHandler = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    }

    const placeOrder = async (e) => {
        e.preventDefault();
        
        let orderItems = [];
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = all_product.find(prod => prod.id === Number(item));
                if (itemInfo) {
                    orderItems.push({
                        ...itemInfo,
                        quantity: cartItems[item]
                    });
                }
            }
        }

        const orderData = {
            items: orderItems,
            amount: getTotalCartAmount(),
            address: address
        };

        const response = await fetch('http://localhost:4000/api/orders/place', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData)
        });

        const data = await response.json();
        if (data.success) {
            toast.success("Order Placed Successfully!");
            // Quick local reload/redirect
            setTimeout(() => {
                window.location.replace("/profile");
            }, 1000);
        } else {
            toast.error("Error placing order. Please try again.");
        }
    }

    return (
        <div className="checkout">
            <form className="checkout-container" onSubmit={placeOrder}>
                <div className="checkout-left">
                    <h2>Delivery Information</h2>
                    <div className="multi-fields">
                        <input required type="text" name="firstName" placeholder="First Name" onChange={changeHandler} value={address.firstName} />
                        <input required type="text" name="lastName" placeholder="Last Name" onChange={changeHandler} value={address.lastName} />
                    </div>
                    <input required type="text" name="phone" placeholder="Phone Number" onChange={changeHandler} value={address.phone} />
                    <input required type="text" name="street" placeholder="Street Address" onChange={changeHandler} value={address.street} />
                    <div className="multi-fields">
                        <input required type="text" name="city" placeholder="City" onChange={changeHandler} value={address.city} />
                        <input required type="text" name="state" placeholder="State/Province" onChange={changeHandler} value={address.state} />
                    </div>
                    <input required type="text" name="zipCode" placeholder="Zip code" onChange={changeHandler} value={address.zipCode} />
                </div>
                
                <div className="checkout-right">
                    <h2>Payment & Summary</h2>
                    <div className="checkout-totals">
                        <div className="totals-item">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="totals-item">
                            <p>Shipping</p>
                            <p>Free</p>
                        </div>
                        <hr />
                        <div className="totals-item total">
                            <h3>Total</h3>
                            <h3>${getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <div className="mock-payment">
                        <h3>Mock Payment Card</h3>
                        <p className="mock-note">This is a simulation. No real card needed.</p>
                        <input type="text" placeholder="Card Number (e.g. 4242 4242 4242 4242)" required />
                        <div className="multi-fields">
                            <input type="text" placeholder="MM/YY" required />
                            <input type="password" placeholder="CVC" required />
                        </div>
                    </div>
                    <button type="submit" className="place-order-btn">PLACE ORDER</button>
                </div>
            </form>
        </div>
    )
}

export default Checkout;
