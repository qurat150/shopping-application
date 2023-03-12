import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar(props) {
  const navigate = useNavigate();
  let linkStyling = {
    color: "white",
    textDecoration: "none",
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "#61B846" }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {props.heading}
          </Typography>
          {props.back ? (
            <Button
              onClick={() => {
                navigate("/productListForBuyer");
              }}
              color="inherit">
              <Link style={linkStyling} to="/login">
                Back
              </Link>
            </Button>
          ) : null}
          {props.cart ? (
            <Button
              onClick={() => {
                props.handleClickClassDialogOpen();
              }}
              color="inherit">
              <Link style={linkStyling}>Cart</Link>
            </Button>
          ) : null}
          {props.logout ? (
            <Button
              onClick={() => {
                props.logout();
              }}
              color="inherit">
              <Link style={linkStyling}>Logout</Link>
            </Button>
          ) : null}
          {props.requestHandler ? (
            <Button color="inherit">
              <Link style={linkStyling}>Requests</Link>
            </Button>
          ) : null}

          {props.account ? (
            <Button
              onClick={() => {
                props.handleClickClassDialogOpen();
              }}
              color="inherit">
              <Link style={linkStyling}>Account</Link>
            </Button>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
