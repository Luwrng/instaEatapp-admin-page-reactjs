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
import PackageManagement from "./component/package/PackageManagement";
import AddPackage from "./component/package/AddPackage";
import ReviewManagement from "./component/review/ReviewManagement";
import TransactionManagement from "./component/transaction/TransactionManagement";
import WalletManagement from "./component/wallet/WalletManagement";
import RestaurantTransaction from "./component/order/RestaurantTransaction";
import EditPackage from "./component/package/EditPackage";

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

            {/* package management */}
            <Route
              path="/package"
              element={
                <PrivateRouter>
                  <PackageManagement />
                </PrivateRouter>
              }
            />

            <Route
              path="/package/add"
              element={
                <PrivateRouter>
                  <AddPackage />
                </PrivateRouter>
              }
            />
            <Route
              path="/package/:id/edit"
              element={
                <PrivateRouter>
                  <EditPackage />
                </PrivateRouter>
              }
            />

            {/* review management */}
            <Route
              path="/review"
              element={
                <PrivateRouter>
                  <ReviewManagement />
                </PrivateRouter>
              }
            />

            {/* transaction */}
            <Route
              path="/transaction"
              element={
                <PrivateRouter>
                  <TransactionManagement />
                </PrivateRouter>
              }
            />

            {/* wallet */}
            <Route
              path="/wallet"
              element={
                <PrivateRouter>
                  <WalletManagement />
                </PrivateRouter>
              }
            />

            {/* restaurant transaction */}
            <Route
              path="/restaurant-transaction"
              element={
                <PrivateRouter>
                  <RestaurantTransaction />
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
