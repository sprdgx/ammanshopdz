import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import "./login.css";




const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await login(dispatch, { username, password });
      navigate("/");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
      <div class='cont'>   
          <div class="container">
            <div class="card">
              <a class="login">Log in</a>
                <div class="inputBox">
                  <input type="text" required="required" onChange={(e) => setUsername(e.target.value)}/>
                  <span >Username</span>
                </div>
                <div class="inputBox">
                  <input type="password" required="required" onChange={(e) => setPassword(e.target.value)}/>
                  <span>Password</span>
                </div>
              <button class="enter" onClick={handleClick}>Enter</button>
            </div>
          </div>
      </div>         
  )}

export default Login;
