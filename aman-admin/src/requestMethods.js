// requestMethods.js

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/";

const persistRoot = localStorage.getItem("persist:root");
const TOKEN = persistRoot ? JSON.parse(JSON.parse(persistRoot).user).currentUser.accessToken : null;

console.log("TOKEN:", TOKEN); // Add this line to log the retrieved token

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` }, // Use 'Authorization' header with 'Bearer' scheme
});
