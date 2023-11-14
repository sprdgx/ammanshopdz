import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../redux/apiCalls";
import { useNavigate } from "react-router-dom";

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
    <div>
          <input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
         />
          <input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleClick}>
            LOGIN
          </button>
      </div>
  );
};

export default Login;
