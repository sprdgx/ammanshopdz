import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    total: 0,
    quantity: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      state.quantity += 1;
    },
    removeProduct: (state, action) => {
      const productIdToRemove = action.payload;
      state.products = state.products.filter((product) => product._id !== productIdToRemove);
      state.total = state.products.reduce((total, product) => total + product.price * product.quantity, 0);
      state.quantity = state.products.reduce((quantity, product) => quantity + product.quantity, 0);
    },
    
    orderPlaced: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    increaseProductQuantity: (state, action) => {
      const productId = action.payload.id;
      const increasedProduct = state.products.find((product) => product._id === productId);
    
      if (increasedProduct) {
        increasedProduct.quantity += 1;
        state.total += increasedProduct.price;
      }
    },
    
    decreaseProductQuantity: (state, action) => {
      const { id } = action.payload;
      const product = state.products.find((item) => item._id === id);
    
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        state.total -= product.price;
      } else if (product && product.quantity === 1) {
        const productIndex = state.products.findIndex((item) => item._id === id);
        if (productIndex !== -1) {
          state.total -= product.price * product.quantity;
          state.quantity -= 1;
          state.products.splice(productIndex, 1);
        }
      }
    },
  },
});

export const {
  addProduct,
  removeProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  orderPlaced,
} = cartSlice.actions;

export default cartSlice.reducer;
