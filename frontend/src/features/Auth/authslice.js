import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createUser, loginUser, addaddress } from "../Auth/authApi";

const initialState = { status: "idle", user: null, error: null };

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response;
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (userData) => {
    const response = await loginUser(userData);
    return response;
  }
);

export const addUserAddressAsync = createAsyncThunk(
  "user/adduseraddress",
  async (userId, userAddress) => {
    const response = await addaddress(userId, userAddress);
    return response;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        (state.status = "idle"), (state.error = null);
        // console.log(action)
        state.user = action.payload;
      })
      .addCase(createUserAsync.rejected, (state, action) => {
        (state.status = "idle"), (state.error = action.error);
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        (state.status = "idle"),
          // console.log(action)
          (state.user = action.payload);
        // console.log(state.user)
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        (state.status = "idle"), (state.error = action.error);
      })
      .addCase(addUserAddressAsync.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addUserAddressAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.status = "idle";
        state.user = action.payload;
      });
  },
});

// export const selectLoggedInUser = (state)=>state.auth.loggedInUser
export const selectLoginInUserDetail = (state) => state.auth.user;
export const selecterror = (state) => state.auth.error;
export const selectAuthState = (state) => state.auth.status;



export const selectError = (state) => state.auth.error;
// export const selectStatus = (state)=>state.auth.status

export const {} = authSlice.actions;

export default authSlice.reducer;
