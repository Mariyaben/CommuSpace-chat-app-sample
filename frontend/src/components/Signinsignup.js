import React, { useState } from "react";
import SignIn from "./Createcommunityminipage";
import SignUp from "./Register";
import "./SignInSignUp.css";
import "../App.css";

function Signinsignup() {
  const [isSignIn, setIsSignIn] = useState(true);

  const handleClick = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <div className="all">
      <div className="tab-group">
        <button className={isSignIn ? "active" : ""} onClick={() => setIsSignIn(true)}>
          Sign In
        </button>
        <button className={!isSignIn ? "active" : ""} onClick={() => setIsSignIn(false)} disabled={!isSignIn}>
          Sign Up
        </button>
      </div>
      {isSignIn ? <SignIn /> : <SignUp />}
    </div>
  );
}

function CreateSSPageWrapper() {
    return (
      <div className="create-ss-page-wrapper">
        <Signinsignup />
      </div>
    );
  }
  
  export default CreateSSPageWrapper;
