import { Button, TextField } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/loginSignup.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("");
  useEffect(() => {
    console.log(accountType);
  }, [accountType]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="main-signup flex">
        <h1 style={{ fontSize: "50px" }}>Log in</h1>
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

        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group">
            <FormControlLabel
              value="seller"
              onChange={(e) => {
                setAccountType(e.currentTarget.value);
              }}
              control={<Radio />}
              label="seller"
            />
            <FormControlLabel
              onChange={(e) => {
                setAccountType(e.currentTarget.value);
              }}
              value="buyer"
              control={<Radio defaultChecked />}
              label="buyer"
            />
            {/* <FormControlLabel value="admin" control={<Radio />} label="admin" /> */}
          </RadioGroup>
        </FormControl>

        <Button
          onClick={() => {
            props.login(email, password, accountType);
          }}
          className="btn-signup"
          variant="contained">
          <Link className="linkStyling" to="/login">
            Log in
          </Link>
        </Button>
      </div>
    </>
  );
};

export default Login;
