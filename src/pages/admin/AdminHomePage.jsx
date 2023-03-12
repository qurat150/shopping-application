import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  child,
  get,
  getDatabase,
  onValue,
  ref,
  update,
} from "firebase/database";
import Product from "../Product";
import "../../firebaseConfig.js";

function AdminHomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const logout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const db = getDatabase();
  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, `products/`))
      .then((snapshot) => {
        console.log("ok");
        if (snapshot.exists()) {
          const productsRef = ref(db, "products/");
          onValue(productsRef, (snapshot) => {
            const productsData = snapshot.val();
            let productsArray = Object.values(productsData);
            console.log(productsArray);
            const newProductArray = productsArray.filter((product) => {
              return !product.isApprove;
            });
            setProducts(newProductArray);
          });
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  console.log(products);
  const approveCart = (id) => {
    const approveRef = ref(db, "products/" + id);
    console.log(approveRef);
    update(approveRef, {
      isApprove: true,
    });
  };

  return (
    <>
      <Navbar requestHandler heading="ADMIN" logout={logout} />
      {products.map((productData) => {
        return (
          <Product
            approveCart={approveCart}
            removeButton
            productData={productData}
          />
        );
      })}
    </>
  );
}

export default AdminHomePage;
