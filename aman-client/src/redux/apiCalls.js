import { loginFailure, loginStart, loginSuccess, registerSuccess } from "./userRedux";
import { orderPlaced } from "./cartRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const register =async (dispatch, registerUser) => {
  try {
    const response = await publicRequest.post("/auth/register", registerUser);
    dispatch(registerSuccess(response.data));
  } catch (error) {
    console.error("Error placing the order:", error);
  }
};

export const placeOrder = async (dispatch, orderData) => {
  try {
    const response = await publicRequest.post("/orders/placeorder", orderData);
    dispatch(orderPlaced(response.data));
  } catch (error) {
    console.error("Error placing the order:", error);
  }
};
