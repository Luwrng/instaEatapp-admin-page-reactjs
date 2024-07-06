import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Menu from "./component/navbar/Menu";
import EditUser from "./component/user/EditUser";
import User from "./component/user/User";
import Restaurant from "./component/restaurant/Restaurant";
import ListFood from "./component/restaurant/listFood";
import Homepage from "./component/home/Homepage";
import LoginForm from "./component/Login/LoginForm";
import AddUserForm from "./component/user/AddUserForm";
import AddRestaurant from "./component/restaurant/AddRestaurant";

const App = () => {
  return (
    <Router>
      <div className="container">
        <div className="menu">
          <Menu />
        </div>

        <div className="content">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/home" element={<Homepage />} />
            <Route path="/user" element={<User />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="/add-user" element={<AddUserForm />} />
            <Route path="/restaurant" element={<Restaurant />} />
            <Route path="/add-restaurant" element={<AddRestaurant />} />
            <Route path="/list_food/:list_food" element={<ListFood />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
