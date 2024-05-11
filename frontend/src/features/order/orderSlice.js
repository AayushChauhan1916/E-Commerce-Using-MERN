import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addorder, fetchOrder, creatingPayment } from "./orderApi";

const initialState = {
  order: [],
  status: {
    success: "",
    message: "",
  },
  currentOrder: null,
  userOrders: [],
  fetchStatus: "",
  razorpayOrder: "",
  razorPayCurrentOrder: "",
};

export const addOrderAsync = createAsyncThunk(
  "order/addorder",
  async (item) => {
    const response = await addorder(item);
    return response;
  }
);
export const fetchOrderAsync = createAsyncThunk(
  "order/fetchOrder",
  async (id) => {
    const response = await fetchOrder(id);
    return response;
  }
);
export const creatingPrepaidOrder = createAsyncThunk(
  "order/prepaidorder",
  async (id) => {
    const response = await creatingPayment(id);
    return response;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    addPredpaidOrder:(state,action)=>{
      state.order.push(action.payload[0])
      state.currentOrder = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addOrderAsync.pending, (state, action) => {
        state.status.success = "Loading";
      })
      .addCase(addOrderAsync.fulfilled, (state, action) => {
        state.order.push(action.payload.order[0]);
        state.currentOrder = action.payload.order;
        state.razorpayOrder = action.payload.razorpayResponse;
        state.status.success = "success";
      })
      .addCase(addOrderAsync.rejected, (state, action) => {
        state.status.message = action.error.message;
        state.status.success = "went wrong";
      })
      .addCase(creatingPrepaidOrder.pending, (state, action) => {
        state.status.success = "Loading";
      })
      .addCase(creatingPrepaidOrder.fulfilled, (state, action) => {
        // state.order.push(action.payload.order[0]);
        // state.currentOrder = action.payload.order;
        state.razorpayOrder = action.payload.razorpayResponse;
        state.razorPayCurrentOrder = action.payload.currentOrder;
        state.status.success = "success";
      })
      .addCase(fetchOrderAsync.pending, (state, action) => {
        state.fetchStatus = "loading";
      })
      .addCase(fetchOrderAsync.fulfilled, (state, action) => {
        state.fetchStatus = "success";
        state.userOrders = action.payload.orders;
      });
  },
});

export const { resetStatus, resetCurrentOrder,addPredpaidOrder } = orderSlice.actions;

export const selectOrder = (state) => state.order.order;
export const selectCurrentOrder = (state) => state.order.currentOrder;
export const selectOrderStatus = (state) => state.order.status;
export const selectUserOrder = (state) => state.order.userOrders;
export const selectrazorpayOrder = (state) => state.order.razorpayOrder;
export const selectRazorPayCurrentOrder = (state) => state.order.razorPayCurrentOrder;
export const selectFetchStatus = (state) => state.order.fetchStatus;

export default orderSlice.reducer;
