import axios from "axios";

const BASE_URL = "http://178.16.131.211:5000/api/";

const persistRoot = localStorage.getItem("persist:root");
const TOKEN = persistRoot ? JSON.parse(JSON.parse(persistRoot).user).currentUser.accessToken : null;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` }, // Use 'Authorization' header with 'Bearer' scheme
});
