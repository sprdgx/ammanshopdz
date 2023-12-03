import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import Orders from "./pages/orders/orders";
import TopBar from "../src/components/topbar/Topbar";

function App() {

  const localStorageData = localStorage.getItem("persist:root");
  const userData = localStorageData ? JSON.parse(JSON.parse(localStorageData).user) : null;

  const isAdmin = userData?.currentUser?.isAdmin;

  return (
    <Router>
     {isAdmin? (<TopBar/>) : ''} 
      <div className="container">
        <Routes>
          {isAdmin === null ? '' : isAdmin ? (
            <>          
              <Route path="/users" element={<UserList />} />
              <Route path="/user/:userId" element={<User />} />
              <Route path="/newUser" element={<NewUser />} />
              <Route path="/product/:productId" element={<Product />} />
              <Route path="/newproduct" element={<NewProduct />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/" element={<ProductList />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/" element={<ProductList />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
