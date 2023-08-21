import React from 'react'
import "../App.css";
import "./navbar.css";
import Home from './Home';
import { NavLink } from 'react-router-dom';
import img from "./20.png";



const Navbar = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const handleLogout = () => {
        localStorage.removeItem("userInfo");
        window.location.href = "/"; // Redirect to home page
    };
    return (
        <>
            <nav className="main-nav">
            <div className="right_data mt-6" >
                <div className="reactLogo mt-9">
                    <img src={img} alt="react logo" width="85" height="85" />
                </div>
            </div>

            
                <div className="logo">
                    <h2>
                        <span>C</span>ommu
                        <span>S</span>pace
                    </h2>
                </div>

                <div className="menu-link">
                    <ul>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">About</NavLink>
                        </li>
                        {userInfo ? (
              <>
                <li>
                  <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                        <li>
                            <NavLink to="/login">Signin</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register">Signup</NavLink>
                        </li>
                        </>
            )}
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar
