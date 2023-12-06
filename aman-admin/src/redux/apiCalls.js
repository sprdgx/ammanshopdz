import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductSuccess,
  addProductFailure,
  addProductSuccess,
} from "./productRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const getOrders = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/orders");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
     const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id, res.data));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
  
};

export const updateProduct = async (productId, dispatch, updatedData) => {
  try {
    const filteredData = {};
    for (const key in updatedData) {
      if (updatedData[key] !== "") {
        filteredData[key] = updatedData[key];
      }
    }
    
    const res = await userRequest.put(`/products/${productId}`, filteredData);
    dispatch(updateProductSuccess(res.data));
  } catch (err) {
    console.error("Error updating product:", err);
  }
};

export const addProduct = async (dispatch, product) => {
  try {
    const res = await userRequest.post("/products", product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    console.error("Error adding product:", err);
    dispatch(addProductFailure());
  }
};
