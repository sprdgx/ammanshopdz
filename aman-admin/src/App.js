import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Routes, Route, Navigate  } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Orders from "./pages/orders/orders";
import { useState } from "react";

function App() {
  const [showSideBar, setShowSideBar] = useState(false);
  const handleSideBarClick = () => {
    setShowSideBar((curr) => !curr);
  };

  // Parse user data from localStorage
  const localStorageData = localStorage.getItem("persist:root");
  const userData = localStorageData ? JSON.parse(JSON.parse(localStorageData).user) : null;

  // Check if user data and isAdmin exist
  const isAdmin = userData?.currentUser?.isAdmin;

  return (
    <Router>
      <Topbar
        handleSideBarClick={handleSideBarClick}
        showSideBar={showSideBar}
      />
      <div className="container">
        <Sidebar showSideBar={showSideBar} />
        <Routes>
          <Route path="/login" element={<Login />} />
          {isAdmin === null ? '' : isAdmin ? (
            // Render routes if isAdmin is true
            <>
              <Route path="/" element={<Home />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
              <Route path="/orders" element={<Orders />} />
            </>
          ) : (
            // Log a message if isAdmin is false
            console.log("You are not an admin.")
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
