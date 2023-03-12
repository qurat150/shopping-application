import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/user/Login";
// import Navbar from "./Components/Navbar";
import AdminHomePage from "./pages/admin/AdminHomePage";
import Signup from "./pages/user/Signup";
import GetStartedPage from "./pages/GetStartedPage";
import ProductList from "./pages/ProductList";
import ProductDetailFormForSeller from "./pages/ProductDetailFormForSeller";
import Carts from "./pages/Carts";
import AdminLogin from "./pages/admin/AdminLogin";

function Routing(props) {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<GetStartedPage />}></Route>
        <Route
          path="/signup"
          element={<Signup signup={props.signup} />}></Route>
        <Route
          exact
          path="/productListForBuyer"
          element={<ProductList />}></Route>

        <Route
          exact
          path="/ProductCatalogue"
          element={<ProductDetailFormForSeller />}></Route>
        <Route
          exact
          path="/login"
          element={<Login login={props.login} />}></Route>
        <Route
          exact
          path="/carts"
          element={<Carts userId={props.userId} />}></Route>
        <Route
          exact
          path="/admin/login"
          element={<AdminLogin adminLogin={props.adminLogin} />}></Route>
        <Route
          exact
          path="/admin"
          element={<AdminHomePage adminLogin={props.adminLogin} />}></Route>

        {/* <Route path="/login" element={<Login login={props.login} />}></Route>
        <Route path="/admin" element={<AdminHomePage />}></Route> */}
      </Routes>
    </>
  );
}

export default Routing;
