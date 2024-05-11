import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/cartpage";
import Checkout from "./pages/Checkout";
import Productdetails from "./pages/Productdetails";
import Homepage from "./pages/homepage";
import Footer from "./features/home/footer/footer";
import CategoryPage from "./pages/CategoryPage";
import Navbar from "./features/navbar/navbar";
import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchAllProductAsync } from "./features/product-list/productslice";
import { fetchCartAsync } from "./features/cart/cartSlice";
import { useEffect } from "react";
import Protected from "./protectedRoutes/protected";
import { selectLoginInUserDetail } from "./features/Auth/authslice";
import PageNotFound from "./pages/pageNotFound";
import { selectOrder } from "./features/order/orderSlice";
import OrderSuccess from "./pages/ordersuccess";
import Order from "./features/order/order";
import { fetchUserAsync, selectCustomer } from "./features/customer/custSlice";


function App() {
  // const user = useSelector(selectLoginInUserDetail);
  const user = useSelector(selectCustomer);
  const userId = user._id;
  const login = useSelector(selectLoginInUserDetail);
  const order = useSelector(selectOrder);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllProductAsync());
  }, [dispatch,order]);

  useEffect(() => {
    if (user._id) {
      dispatch(fetchCartAsync(userId));
    }
  }, [user, order, dispatch]);

  useEffect(() => {
    dispatch(fetchUserAsync());
  }, [dispatch, order, login]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/kids" element={<CategoryPage category="kid"/>} />
        <Route
          exact
          path="/women"
          element={<CategoryPage category="women" />}
        />
        <Route exact path="/men" element={<CategoryPage category="men" />} />
        <Route exact path="/productdetails/:id" element={<Productdetails />} />
        <Route
          exact
          path="/checkout"
          element={
            <Protected>
              <Checkout />
            </Protected>
          }
        />
        <Route
          exact
          path="/cart"
          element={
            <Protected>
              <CartPage />
            </Protected>
          }
        />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/ordersuccess/:id" element={<OrderSuccess />} />
        <Route
          exact
          path="/orders"
          element={
            <Protected>
              <Order />
            </Protected>
          }
        />
        {/* <Route
          exact
          path="/payment-checkout"
          element={
            <Protected>
              <PaymentCheckout/>
            </Protected>
          }
        /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </BrowserRouter>
  );
}

export default App;
