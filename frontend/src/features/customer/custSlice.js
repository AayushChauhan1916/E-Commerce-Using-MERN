import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchUser } from "./custApi";

const initialState = {
  customer: false,
};

export const fetchUserAsync = createAsyncThunk(
  "customer/fetchUser",
  async () => {
    const response = await fetchUser();
    return response;
  }
);

export const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserAsync.pending, (state, action) => {
        state.status = "Loading";
      })
      .addCase(fetchUserAsync.fulfilled, (state, action) => {
        state.status = "success";
        state.customer = action.payload.user;
      });
  },
});

export const {} = customerSlice.actions;

export const selectCustomer = (state) => state.customer.customer;

export default customerSlice.reducer;
