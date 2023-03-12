import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/loginSignup.css";

const AdminLogin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="main-signup flex">
        <h1 style={{ fontSize: "50px" }}>Admin Login</h1>

        <TextField
          value={email}
          onChange={handleEmailChange}
          className="textFields"
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          value={password}
          onChange={handlePasswordChange}
          className="textFields"
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />

        <Button
          onClick={() => {
            props.adminLogin(email, password);
          }}
          className="btn-signup"
          variant="contained">
          <Link className="linkStyling" to="/admin/login">
            Log in
          </Link>
        </Button>
      </div>
    </>
  );
};

export default AdminLogin;
