import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import "../firebaseConfig.js";

function Cart(props) {
  const cartData = props.cartData;
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={cartData.name}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={cartData.image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {cartData.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing></CardActions>
      </Card>
    </>
  );
}

export default Cart;
