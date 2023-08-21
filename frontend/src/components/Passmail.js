import React, {useState} from "react";
import logo from "./2.png";
import { NavLink } from 'react-router-dom';
import "../App.css";

export const Passmail = (props) =>{
    const [email, setEmail1] = useState('');

const handleSubmit = (e) => { 
    e.preventDefault();
    console.log(email);
}

return (
    <>
    <div>
        
        </div>
        <section className="passmail">
            <div className="container mt-5">
                <div className="pass">
                    <div className="auth-form-container3">
                        <form className="pass-mail-form" onSubmit={handleSubmit}>
                            <h2 className="form-title">Verify through email</h2>
                            <label htmlFor="email"></label>
                            <input value={email} onChange={(e) => setEmail1(e.target.value)} type="email" placeholder="Enter email address" id="email" autoComplete="off" name="email"/>
                            <button type="submit">Send Login link</button>

                            </form>
                        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Verify using phone number</button>
                        <button className="link-btn" onClick={() => props.onFormSwitch('register')}>Register to CommuSpace</button>
                    </div>
            
                </div>
            </div>
        </section>
        
    </>
        
    )
}

function CreatePassmailPageWrapper() {
    return (
      <div className="create-passmail-page-wrapper">
        <Passmail />
      </div>
    );
  }
  
  export default CreatePassmailPageWrapper;
