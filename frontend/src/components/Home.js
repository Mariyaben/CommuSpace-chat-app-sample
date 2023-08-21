import React from 'react'
import bg from"./1.gif";
import logo from "./9.jpg";
import img from "./20.png";
import '../App.css';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = (props) => {
    return (
     <>
     <div className="Halomachu">
        

        <div className="auth-form-container7">
            <form className="register-form10" >

            <div className="right_data mt-6" >
                <div className="reactLogo mt-6">
                    <img src={img} alt="react logo" width="300" height="300" />
                </div>
            </div>
           
            </form>

        
            <Link to="/login">
                <button type="button" className="btn btn-danger btn-lg">Login</button>
            </Link>

            <Link to="/joincommunity">
                <button type="button" className="btn btn-danger btn-lg">Discover Communities</button>
            </Link>



        </div>
     </div>

        </>
    )
}

function CreateHomePageWrapper() {
    return (
      <div className="create-home-page-wrapper">
        <Home />
      </div>
    );
  }
  
  export default CreateHomePageWrapper;
