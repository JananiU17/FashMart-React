import React, { createContext, useEffect, useState } from "react";
import { toast } from 'react-toastify';

export const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {};
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props) => {
    const [all_product, setAll_Product] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    useEffect(() => {
        fetch('http://localhost:4000/api/products/allproducts')
            .then((response) => response.json())
            .then((data) => setAll_Product(data))

        if (localStorage.getItem('auth-token')) {
            fetch('http://localhost:4000/api/cart/getcart', {
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body: "",
            }).then((response) => response.json())
                .then((data) => setCartItems(data));
        }
    }, [])

    const addToCart = (itemId) => {
        if (!localStorage.getItem('auth-token')) {
            toast.warn("Please Login to Add Items to Cart!");
            return;
        }

        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        fetch('http://localhost:4000/api/cart/addtocart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "itemId": itemId }),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.success) {
                    toast.success("Added to Cart Successfully!");
                } else {
                    toast.error("Failed to add to cart");
                }
            });
    }

    const removeFromCart = (itemId) => {
        if (!localStorage.getItem('auth-token')) return;

        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        fetch('http://localhost:4000/api/cart/removefromcart', {
            method: 'POST',
            headers: {
                Accept: 'application/form-data',
                'auth-token': `${localStorage.getItem('auth-token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "itemId": itemId }),
        })
            .then((response) => response.json())
            .then((data) => {
                if(data.success) {
                    toast.success("Removed from Cart Successfully!");
                } else {
                    toast.error(data.error || "Failed to remove from cart");
                }
            });
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                let itemInfo = all_product.find((product) => product.id === Number(item))
                if (itemInfo) {
                    totalAmount += itemInfo.new_price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItems = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalItems += cartItems[item];
            }
        }
        return totalItems;
    }

    const contextValue = { getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart };
    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;