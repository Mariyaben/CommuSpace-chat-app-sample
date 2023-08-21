import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import logo from "./24.png"
import "../App.css";
export const Register = (props) =>{
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [registrationStatus, setRegistrationStatus] = useState(null); // Add this state




    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch('/user/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userName: name,
              phone: phone,
              email: email,
              DOB: date,
              password: pass,
            }),
          });
          const data = await response.json();
          console.log(data);

          // Set the registration status based on the response
          if (response.ok) {
            setRegistrationStatus('success');
        } else {
            setRegistrationStatus('failure');
        }
    } catch (error) {
        console.error(error);
        setRegistrationStatus('failure');
    }
};


      // Render popup based on registration status
    // Render popup based on registration status
    const renderPopup = () => {
      if (registrationStatus === "success") {
        return (
          <div className="popup success">
            <div className="popup-box">
              <h3>Registration Successful!</h3>
              <p>You have successfully registered.</p>
              <button onClick={() => setRegistrationStatus(null)}>Close</button>
            </div>
          </div>
        );
      } else if (registrationStatus === "failure") {
        return (
          <div className="popup failure">
            <div className="popup-box">
              <h3>Registration Failed</h3>
              <p>Registration failed. Please try again.</p>
              <button onClick={() => setRegistrationStatus(null)}>Close</button>
            </div>
          </div>
        );
      } else if (registrationStatus !== null) {
        return (
          <div className="popup failure">
            <div className="popup-box">
              <h3>Unexpected Response</h3>
              <p>An unexpected response occurred. Please try again.</p>
              <button onClick={() => setRegistrationStatus(null)}>Close</button>
            </div>
          </div>
        );
      }
      return null;
    };
    

      

    return (
    <>
    
        <div className="machu">

        <div className="auth-form-container">
            <form className="register-form" onSubmit={handleSubmit}>

            <h2 className="form-title1">Signup</h2>
            <input value={name} onChange={(e) => setName(e.target.value)} type="name" placeholder="Name" id="name" name="name"/>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="phone" placeholder="Phone Number" id="phone" name="phone"/>

            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="yourmail@gmail.com" id="email" name="email"/>
            <input value={pass} onChange= {(e) => setPass(e.target.value)} type="password" placeholder="Set Password" id="password" name="password"/>
            <input value={date} onChange= {(e) => setDate(e.target.value)} type="date" placeholder="Date of Birth" id="date" name="date"/>

            <button onClick={handleSubmit}>Register</button>
        
             </form>

             <NavLink to = "/login" className="signup-image-link">Sign in </NavLink>
        
         </div>
        </div>
        {/* Render the popup */}
        {renderPopup()}
    </>
    )
}

function CreateRegisterPageWrapper() {
    return (
      <div className="create-register-page-wrapper">
        <Register/>
      </div>
    );
  }
  
  export default CreateRegisterPageWrapper;
