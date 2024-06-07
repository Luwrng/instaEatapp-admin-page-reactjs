import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { Pagination } from "antd";
import Menu from "./component/navbar/Menu";
import Dashboard from "./component/Dashboard";
import Orders from "./component/Orders";
import Product from "./component/Product";
import Customers from "./component/Customers";
import Categories from "./component/Categories";
import Stores from "./component/Stores";
import Couriers from "./component/Couriers";
import LogOut from "./component/LogOut";

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="menu">
          <Menu />
        </div>

        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/product" element={<Product />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/stores" element={<Stores />} />
            <Route path="/couriers" element={<Couriers />} />
            <Route path="/logout" element={<LogOut />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
