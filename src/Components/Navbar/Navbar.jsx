import React, { useState, useContext, useRef } from 'react'
import { Link } from 'react-router-dom' // Add this line to import the 'Link' component
import './Navbar.css'

import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import dropdown_icon from '../Assets/dropdown_icon.png'

const Navbar = () => {

   const [menu,setMenu] = useState("home");
   const{getTotalCartItems} = useContext(ShopContext);
   const menuRef = useRef();

   const dropdown_toggle = (e) =>{
    menuRef.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');

    }

  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="logo" />
        <p>FASHMART</p>
        </div>
        <img className='nav-dropdown' onClick={dropdown_toggle} src={dropdown_icon} alt="" />
        <ul ref={menuRef}className="nav-menu">
           <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none'}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li> 
           <li onClick={()=>{setMenu("mens")}}><Link style={{textDecoration:'none'}} to='/mens'>Men</Link>{menu==="mens"?<hr/>:<></>}</li>
           <li onClick={()=>{setMenu("womens")}}><Link style={{textDecoration:'none'}} to='/womens'>Women</Link>{menu==="womens"?<hr/>:<></>}</li>
           <li onClick={()=>{setMenu("kids")}}><Link style={{textDecoration:'none'}} to='/kids'>Kids</Link>{menu==="kids"?<hr/>:<></>}</li>
        </ul>
        <div className ="nav-login-cart">
            {localStorage.getItem('auth-token')
            ? <button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
            : <Link to='/login'><button>Login</button></Link>}
           <Link to='/cart'><img src={cart_icon} alt="cart" /></Link> 
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar
