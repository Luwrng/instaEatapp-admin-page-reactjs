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
import PrivateRouter from "./component/PrivateRouter/PrivateRouter";

const App = () => {
  const isLogged = localStorage.getItem("token");

  return (
    <Router>
      <div className="container">
        {isLogged && (
          <div className="menu">
            <Menu />
          </div>
        )}

        <div className="content">
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route
              path="/home"
              element={
                <PrivateRouter>
                  <Homepage />
                </PrivateRouter>
              }
            />
            <Route
              path="/user"
              element={
                <PrivateRouter>
                  <User />
                </PrivateRouter>
              }
            />
            <Route
              path="/edit-user/:id"
              element={
                <PrivateRouter>
                  <EditUser />
                </PrivateRouter>
              }
            />
            <Route
              path="/add-user"
              element={
                <PrivateRouter>
                  <AddUserForm />
                </PrivateRouter>
              }
            />
            <Route
              path="/restaurant"
              element={
                <PrivateRouter>
                  <Restaurant />
                </PrivateRouter>
              }
            />
            <Route
              path="/add-restaurant"
              element={
                <PrivateRouter>
                  <AddRestaurant />
                </PrivateRouter>
              }
            />
            <Route
              path="/list_food/:list_food"
              element={
                <PrivateRouter>
                  <ListFood />
                </PrivateRouter>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
