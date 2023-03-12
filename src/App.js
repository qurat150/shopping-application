import React, { Fragment, useEffect, useState } from "react";
import Routing from "./Routing";
import "./firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, set, ref, child, get } from "firebase/database";
import { useNavigate } from "react-router-dom";
const auth = getAuth();
const db = getDatabase();
function App() {
  const [userId, setUserId] = useState();
  useEffect(() => {
    setUserId(auth.currentUser?.uid);
  }, [auth]);
  const navigate = useNavigate();
  const signup = (username, email, password, accountType) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        alert("New user signed in Successfulyy");
        function writeUserData(userId, name, email, password) {
          set(ref(db, "users/" + userId), {
            name: username,
            email: email,
            password: password,
            type: accountType,
            isBlock: false,
          });
        }
        writeUserData(user.uid, username, email, password);
        if (accountType == "seller") {
        }
        navigate("/ProductCatalogue");
        if (accountType == "buyer") {
          navigate("/productListForBuyer");
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };
  const login = (email, password, accountType) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const userUid = userCredential.user.uid;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `users/${userUid}`))
          .then((snapshot) => {
            let userData = snapshot.val();
            if (accountType == userData.type) {
              if (accountType == "buyer") {
                navigate("/productListForBuyer");
              }
              if (accountType == "seller") {
                navigate("/ProductCatalogue");
              }
            } else {
              alert("You have not signed up as " + accountType);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode, errorMessage);
      });
  };
  const adminLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const userUid = userCredential.user.uid;
      const dbRef = ref(getDatabase());
      get(child(dbRef, `users/${userUid}`))
        .then((snapshot) => {
          let userData = snapshot.val();
          if (snapshot.exists()) {
            if (userData.role === "admin") {
              navigate("/admin");
            }
            console.log(snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };
  return (
    <Fragment>
      <Routing
        userId={userId}
        adminLogin={adminLogin}
        login={login}
        signup={signup}
      />
    </Fragment>
  );
}

export default App;
