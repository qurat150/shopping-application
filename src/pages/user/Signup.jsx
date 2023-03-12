import { Button, TextField } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/loginSignup.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const Signup = (props) => {
  const [username, setUsername] = useState("");
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
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  return (
    <Fragment>
      <div className="main-signup flex">
        <div className="saylaniWelfareTextLoginSignup">SAYLANI WELFARE</div>
        <div className="onlineMArketPlaceTextLoginSignup">
          ONLINE MARKET PLACE
        </div>
        <TextField
          value={username}
          onChange={handleUsernameChange}
          className="textFields"
          id="outlined-basic"
          label="Username"
          variant="outlined"
        />
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
        <Link to="/login">Don't have an account</Link>
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
            props.signup(username, email, password, accountType);
          }}
          className="btn-signup"
          variant="contained">
          <Link className="linkStyling" to="/signup">
            Sign up
          </Link>
        </Button>
      </div>
    </Fragment>
  );
};

export default Signup;
