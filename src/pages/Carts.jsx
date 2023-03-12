import { child, get, getDatabase, onValue, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getAuth } from "firebase/auth";
import Cart from "./Cart";

const db = getDatabase();
const auth = getAuth();
function Carts(props) {
  const [carts, setCarts] = useState([]);
  const userId = props.userId;
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("ok");
        const dbRef = ref(getDatabase());
        get(child(dbRef, `carts/` + auth.currentUser.uid))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const cartRef = ref(db, `carts/` + auth.currentUser.uid);
              onValue(cartRef, (snapshot) => {
                const cartsData = snapshot.val();
                const cartsArray = Object.values(cartsData);
                console.log(cartsArray);
                setCarts(cartsArray);
              });
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
  }, [userId]);

  return (
    <>
      <Navbar heading="CARTS" back />
      {carts.map((cartData) => {
        return <Cart cartData={cartData} />;
      })}
    </>
  );
}

export default Carts;
