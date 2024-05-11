import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchproduct } from './productApi'

const initialState = {
    products : [],
    status : 'idle',
    isProduct : false
}

export const fetchAllProductAsync = createAsyncThunk('product/fetchAllProduct',async()=>{
    const response = await fetchproduct();
    return response.data
})

export const productSlice = createSlice({
  name: 'product',
  initialState : initialState,
  reducers: {
  },
  extraReducers :(builder)=>{
    builder
        .addCase(fetchAllProductAsync.pending,(state)=>{
            state.status = 'loading';
        })
        .addCase(fetchAllProductAsync.fulfilled,(state,action)=>{
            state.status = 'success',
            // console.log(action)
            state.products = action.payload.product;
            state.isProduct = true;
        })
        .addCase(fetchAllProductAsync.rejected,(state,action)=>{
            state.status = 'failed',
            // console.log(action)
            state.products = action.payload.product;

        })
  }
})


// Action creators are generated for each case reducer function
export const {} = productSlice.actions;

export const productSelector = (state)=>state.product.products;
export const productStatus = (state)=>state.product.status;
export const isProduct = (state)=>state.product.isProduct;

export default productSlice.reducer;