import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/productLists.css";
import bannerImg from "./../images/productlistBannerImage.png";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Product from "./Product";
import { getDatabase, ref, child, get, onValue } from "firebase/database";
import "../firebaseConfig.js";

const db = getDatabase();
function ProductList() {
  const [products, setProducts] = useState([]);
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: " rgb(145 144 144 / 75%);",
    },
    marginRight: theme.spacing(2),
    // marginLeft: 0,
    width: "95%",
    backgroundColor: " rgba(217, 217, 217, 0.75);",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "20px",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));
  useEffect(() => {
    const dbRef = ref(getDatabase());
    get(child(dbRef, `products/`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const productsRef = ref(db, "products/");
          onValue(productsRef, (snapshot) => {
            const productsData = snapshot.val();
            let productsArray = Object.values(productsData);
            console.log(productsArray);
            const newProductsArray = productsArray.filter((product) => {
              console.log(product);
              return product.isApprove;
            });
            setProducts(newProductsArray);
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <Navbar heading="Products" home account />
      <div className="saylaniWelfareText">SAYLANI WELFARE</div>
      <div className="saylaniWelfareText onlineMArketPlaceText">
        ONLINE MARKET PLACE
      </div>
      <div className="bannerImageDiv flex">
        <img className="bannerImage" src={bannerImg} alt="Banner image" />
      </div>
      <h3 style={{ marginTop: "10px", marginLeft: "40px" }}>
        Search by Catagory
      </h3>
      <Search>
        <SearchIconWrapper>
          <SearchIcon />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </Search>
      <div className="product-main">
        {products.map((productData) => {
          return <Product addCartButton productData={productData} />;
        })}
      </div>
    </>
  );
}

export default ProductList;
