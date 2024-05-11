import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "../features/cart/cartSlice";
import authReducer from '../features/Auth/authslice';
import productReducer from "../features/product-list/productslice"
import orderReducer from "../features/order/orderSlice"
import custReducer from "../features/customer/custSlice"

const store = configureStore(
    {
        reducer: {
            cart : cartReducer,
            auth : authReducer,
            product: productReducer,
            order : orderReducer,
            customer: custReducer
        }
    }
)
export default store;