import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CSS/Profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('auth-token');
        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch User Info
        fetch('http://localhost:4000/api/users/me', {
            method: 'POST',
            headers: {
                'auth-token': token,
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setUserData(data.data);
            }
        });

        // Fetch Order History
        fetch('http://localhost:4000/api/orders/history', {
            method: 'POST',
            headers: {
                'auth-token': token,
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                // Reverse to show newest first
                setOrders(data.data.reverse());
            }
        });
    }, [navigate]);

    return (
        <div className="profile-page">
            <div className="profile-box">
                <h2>Welcome, {userData ? userData.name : "..."}</h2>
                <p><strong>Email:</strong> {userData ? userData.email : "..."}</p>
                <button 
                  onClick={() => { localStorage.removeItem('auth-token'); window.location.replace('/'); }} 
                  style={{marginTop: "20px", padding: "10px 20px", cursor: "pointer", background: "#ff4141", color: "white", border: "none", borderRadius: "4px"}}
                >
                  Logout
                </button>
            </div>

            <div className="orders-container">
                <h2>My Orders</h2>
                {orders.length === 0 ? <p>You haven't placed any orders yet!</p> : null}
                
                {orders.map((order, index) => (
                    <div className="order-card" key={index}>
                        <div className="order-header">
                            <div>
                                <span>Order Placed: {new Date(order.date).toLocaleDateString()}</span>
                                <br/>
                                <span style={{color: "#555", fontSize: "14px"}}>Total: ${order.amount}</span>
                            </div>
                            <div className="order-status">{order.status}</div>
                        </div>
                        <div className="order-items">
                            {order.items.map((item, i) => (
                                <div className="order-item-row" key={i}>
                                    <img src={item.image} alt="product" />
                                    <div className="order-item-details">
                                        <span>{item.name}</span>
                                        <span>Qty: {item.quantity} | ${item.new_price}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Profile;
