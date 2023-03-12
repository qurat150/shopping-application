import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { getAuth } from "firebase/auth";
import { getDatabase, set, ref, push, child, get } from "firebase/database";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";
import "../firebaseConfig.js";
import { useNavigate } from "react-router-dom";

const auth = getAuth();
const db = getDatabase();

function ProductDetailFormForSeller(props) {
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    file: null,
    name: "",
    category: "",
    description: "",
    price: "",
    isApprove: false,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name == "file") {
      setProductData({
        ...productData,
        [name]: event.target.files[0],
      });
    } else {
      setProductData({
        ...productData,
        [name]: value,
      });
    }
  };

  const updateProductData = (imageUrl) => {
    const obj = {
      name: productData.name,
      category: productData.category,
      description: productData.description,
      price: productData.price,
      isApprove: productData.isApprove,
      image: imageUrl,
    };

    const productRef = ref(db, "products/");
    const newProductRef = push(productRef);
    let productId = newProductRef.key;
    set(newProductRef, { ...obj, productId }).then(() => {
      navigate("/productListForBuyer");
    });
  };

  const addProductHandler = () => {
    const storage = getStorage();
    const fileName = productData.file.name + Date.now();

    const imageRef = storageRef(storage, "images/" + fileName);

    const uploadTask = uploadBytesResumable(imageRef, productData.file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          updateProductData(downloadURL);
        });
      }
    );
  };
  return (
    <>
      <div className="main-signup flex">
        <div className="saylaniWelfareTextLoginSignup">SAYLANI WELFARE</div>
        <div className="onlineMArketPlaceTextLoginSignup">ADD PRODUCT</div>

        <div>
          <TextField
            type="file"
            name="file"
            className="textFields"
            id="outlined-basic"
            onChange={handleInputChange}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            value={productData.name}
            onChange={handleInputChange}
            name="name"
            className="textFields"
            id="outlined-basic"
            label="Name"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            value={productData.category}
            onChange={handleInputChange}
            name="category"
            className="textFields"
            id="outlined-basic"
            label="Category"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            value={productData.price}
            onChange={handleInputChange}
            name="price"
            className="textFields"
            id="outlined-basic"
            label="Price"
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            value={productData.description}
            onChange={handleInputChange}
            name="description"
            className="textFields"
            id="outlined-basic"
            label="Description"
            variant="outlined"
          />
        </div>
        <div>Product will send to Admin for approval.</div>
        <DialogActions>
          <Button onClick={props.handleClose}>Cancel</Button>
          <Button
            variant="contained"
            onClick={() => {
              addProductHandler();
            }}>
            Add Product
          </Button>
        </DialogActions>
      </div>
    </>
  );
}

export default ProductDetailFormForSeller;
