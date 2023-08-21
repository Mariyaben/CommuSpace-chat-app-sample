import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";


export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setLoginStatus("failure");
        console.log("Login failed");
      } else {
        const data = await response.json();
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoginStatus("success");
        console.log("Login successful", data);
        navigate("/dashboard"); // Redirect to dashboard after successful login
      }
    } catch (error) {
      console.error(error.message);
      setLoginStatus("failure");
    }
  };

  const closePopup = () => {
    setLoginStatus(null);
  };

  const renderPopup = () => {
    if (loginStatus === "success" || loginStatus === "failure") {
      return (
        <div className={`login-popup ${loginStatus}`}>
  <div className="login-popup-content">
    <p>
      {loginStatus === "success"
        ? "Login Successful!"
        : loginStatus === "failure"
        ? "Login Failed. Please try again."
        : ""}
    </p>
    <button
      className="login-popup-close-button"
      onClick={() => setLoginStatus(null)}
    >
      Close
    </button>
  </div>
</div>

        
      );
    }
    return null;
  };

  return (
    <>
      <div className="Bebo">
        <section className="signin">
          <div className="container mt-5">
            <div className="signup-content">
              <div className="auth-form-container1">
                <form className="login-form" onSubmit={handleSubmit}>
                  <h2 className="form-title">Welcome Back!</h2>
                  <label htmlFor="email"></label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Phone or Email"
                    id="email"
                    autoComplete="off"
                    name="email"
                  />
                  <label htmlFor="password"></label>
                  <input
                    value={password}
                    onChange={(e) => setPass(e.target.value)}
                    type="password"
                    placeholder="************"
                    id="password"
                    autoComplete="off"
                    name="password"
                  />
                  <button type="submit">Login</button>
                </form>
                <NavLink to="/register" className="signup-image-link1">
                  New to CommuSpace? Register
                </NavLink>
                <NavLink to="/passmail" className="signup-image-link1">
                  Forgot Password?
                </NavLink>
              </div>
            </div>
          </div>
        </section>
      </div>
      {renderPopup()}
    </>
  );
};

function CreateLoginPageWrapper() {
  return (
    <div className="create-login-page-wrapper">
      <Login />
    </div>
  );
}

export default CreateLoginPageWrapper;
