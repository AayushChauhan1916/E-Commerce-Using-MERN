import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCart,deleteFromCart,fetchCart } from "./cartApi";

const initialState = {
  status: {
    state:"idle",
    message:"aayush"
  },
  cart:[],
  isCart:true
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.cart;
  }
);
export const deleteFromCartAsync = createAsyncThunk(
  "cart/deleteCart",
  async (userId,productId) => {
    const response = await deleteFromCart(userId,productId);
    return response.data;
  }
);
export const fetchCartAsync = createAsyncThunk("/cart/fetchcart",async(userId)=>{
  const response = await fetchCart(userId);
  return response.data;
})

export const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state, action) => {
        state.status = {state:"loading",message:"adding item...."};
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = {state:"success",message:"item added successfully"}, 
        state.cart = action.payload
        // console.log(action.payload)
        // state.value.push(action.meta.arg);
      })
      .addCase(deleteFromCartAsync.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(deleteFromCartAsync.fulfilled, (state, action) => {
        // console.log(action.payload.cart)
        state.cart = action.payload.cart
      })
      .addCase(fetchCartAsync.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchCartAsync.fulfilled, (state, action) => {
        // console.log(action)
        state.cart = action.payload.cart
        state.isCart = true;
      })
  },
});

export const selectCart1 = (state) => state.cart.cart;
// export const selectCart = (state) => state.cart.value;
export const selectCartStatus = (state) => state.cart.status;
export const selectIsCart = (state) => state.isCart;

// Action creators are generated for each case reducer function
export const {} = cartSlice.actions;

export default cartSlice.reducer;
