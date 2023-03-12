import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getDatabase, push, ref, set } from "firebase/database";
import "../firebaseConfig.js";

const auth = getAuth();
const db = getDatabase();
const userId = auth.currentUser?.uid;
function Product(props) {
  const productData = props.productData;
  const navigate = useNavigate();

  const cartHandler = () => {
    const cartRef = ref(db, "carts/" + auth.currentUser.uid);
    const newCartRef = push(cartRef);
    let cartId = newCartRef.key;
    set(newCartRef, { ...productData, cartId }).then(() => {
      navigate("/carts");
    });
  };

  let addCartBtnStyling = {
    marginLeft: "auto",
    backgroundColor: "#61B846",
    "&:hover": {
      backgroundColor: "#3b7b28",
    },
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          title={productData.name}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={productData.image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {productData.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {props.addCartButton ? (
            <Button
              onClick={() => {
                cartHandler();
              }}
              variant="contained"
              sx={addCartBtnStyling}>
              Add to Cart
            </Button>
          ) : null}
          {props.removeButton ? (
            <Button
              onClick={() => {
                props.approveCart(productData.productId);
              }}
              variant="contained"
              sx={addCartBtnStyling}>
              Approve
            </Button>
          ) : null}
        </CardActions>
      </Card>
    </>
  );
}

export default Product;
