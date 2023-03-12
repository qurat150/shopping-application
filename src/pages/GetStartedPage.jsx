import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import saylaniLogo from "./../images/Logo.png";
import "../styles/getStartedPage.css";

function GetStartedPage() {
  const buttonSX = {
    backgroundColor: "#61B846",
    position: "absolute",
    top: "40rem",
    "&:hover": {
      backgroundColor: "#3b7b28",
    },
  };
  return (
    <>
      <div className="getStartedContainer flex">
        <img className="logo" src={saylaniLogo} alt="no img" />
        <div className="saylaniWelfareText">SAYLANI WELFARE</div>
        <div className="saylaniWelfareText onlineMArketPlaceText">
          ONLINE MARKET PLACE
        </div>
        <Button sx={buttonSX} variant="contained">
          <Link className="linkStyling" to="/signup">
            Get started
          </Link>
        </Button>
      </div>
    </>
  );
}

export default GetStartedPage;
