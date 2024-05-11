import React from "react";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import all_product from "../assets/all_product";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart1,
  deleteFromCartAsync,
  selectIsCart,
} from "../features/cart/cartSlice";
import { addUserAddressAsync } from "../features/Auth/authslice";
import CircularProgress from "@mui/material/CircularProgress";
import {
  addOrderAsync,
  creatingPrepaidOrder,
} from "../features/order/orderSlice";
import {
  selectCurrentOrder,
  selectrazorpayOrder,
  selectRazorPayCurrentOrder,
} from "../features/order/orderSlice";
import { selectOrderStatus } from "../features/order/orderSlice";
import { resetStatus, addPredpaidOrder } from "../features/order/orderSlice";
import { selectCustomer } from "../features/customer/custSlice";
import { toast } from "react-toastify";

const Checkout = () => {
  const orderStatus = useSelector(selectOrderStatus);
  // const isCart = useSelector(selectIsCart);
  const razorpayOrder = useSelector(selectrazorpayOrder);
  const razorPayCurrentOrder = useSelector(selectRazorPayCurrentOrder);
  const user = useSelector(selectCustomer);
  // console.log(user)
  const [shippingaddress, setShippingAddress] = useState(user.address[0]);
  const [paymentmethod, setPaymentMethod] = useState("cash");
  const currentOrder = useSelector(selectCurrentOrder);
  const userId = user._id;
  const dispatch = useDispatch();
  const product = useSelector(selectCart1);
  const totalPrice = product.reduce((amount, item) => {
    return item.quantity * item.product.new_price + amount;
  }, 0);
  const totalItem = product.reduce((num, item) => {
    return item.quantity + num;
  }, 0);
  const handleDelete = (e, userId, productId) => {
    e.preventDefault();
    dispatch(deleteFromCartAsync({ productId, userId }));
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(addUserAddressAsync({ userId: userId, userAddress: data }));
    reset();
  };

  // const status = useSelector(selectAuthState)
  const handleAddress = (e) => {
    const idx = e.target.value;
    const address = user.address[idx];
    setShippingAddress(address);
  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };

  // useEffect(() => {
  //   if (status === 'loading') {
  //     toast.info("Adding address...");
  //   } else if (status === 'success') {
  //     toast.success("Address added successfully!");
  //   }
  // }, [status]);

  useEffect(() => {
    if (orderStatus === "success") {
      setTimeout(() => {
        dispatch(resetStatus());
      }, 9000); // Reset status after 5 seconds, adjust as needed
    }
  }, [orderStatus]);

  const handleOrder = (e) => {
    if (shippingaddress == null) {
      console.log(user.address.length);
      toast.info("Please Add Your Address First");
    } else {
      if (paymentmethod == "cash") {
        dispatch(
          addOrderAsync({
            user: user._id,
            product: product,
            shippingaddress: shippingaddress,
            totalAmount: totalPrice,
            totalItems: totalItem,
            paymentmethod: paymentmethod,
          })
        );
      } else {
        dispatch(
          creatingPrepaidOrder({
            user: user._id,
            product: product,
            shippingaddress: shippingaddress,
            totalAmount: totalPrice,
            totalItems: totalItem,
            paymentmethod: paymentmethod,
          })
        );
        var options = {
          key: "rzp_test_WjYkuxQq5QqRtK",
          amount: totalPrice * 100, // Enter the Key ID generated from the Dashboard // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
          currency: "INR",
          name: "Krishna", //your business name
          description: "Test Transaction",
          image:
            "https://img.freepik.com/free-vector/gradient-instagram-shop-logo-template_23-2149704603.jpg?size=338&ext=jpg&ga=GA1.1.553209589.1714953600&semt=ais",
          order_id: razorpayOrder.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
          handler: async function (response) {
            const body = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              currentOrder: razorPayCurrentOrder,
            };
            const validateResponse = await fetch(
              "/api/order/orderpayment/validate",
              {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const data = await validateResponse.json();
            if (data.success == false) {
              toast.error(data.message);
            }
            const currOrder = data.order;
            // console.log(currOrder);
            dispatch(addPredpaidOrder(currOrder));
          },
          prefill: {
            //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            name: user.name, //your customer's name
            email: user.email,
            contact: "7060457474", //Provide the customer's phone number for better conversion rates
          },
          notes: {
            address: user.address[0],
          },
          theme: {
            color: "#3399cc",
          },
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.on("payment.failed", function (response) {
          toast.error(response.error.code);
          toast.error(response.error.description);
          toast.error(response.error.source);
          toast.error(response.error.step);
          toast.error(response.error.reason);
          toast.error(response.error.metadata.order_id);
          toast.error(response.error.metadata.payment_id);
        });
        rzp1.open();
        e.preventDefault();
      }
    }
  };

  if (!product || product.length === 0) {
    return <Navigate to="/" />;
  }

  if (orderStatus.success == "went wrong") {
    toast.error(orderStatus.message, {
      position: "top-center",
    });
  }

  return (
    <>
      {true ? (
        <>
          {currentOrder && (
            <Navigate
              to={`/ordersuccess/${currentOrder[0]._id}`}
              replace={true}
            />
          )}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 bg-white">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-6">
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <h2 className="text-base font-semibold leading-7 text-gray-900">
                        Personal Information
                      </h2>
                      <p className="mt-1 text-sm leading-6 text-gray-600">
                        Use a permanent address where you can receive mail.
                      </p>

                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Name
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("name", {
                                required: "name missing",
                              })}
                              id="first-name"
                              autoComplete="given-name"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.name && (
                            <p className="text-red-500">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              {...register("email", {
                                required: "email missing",
                              })}
                              type="email"
                              autoComplete="email"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.email && (
                            <p className="text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="street-address"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("street", {
                                required: "street missing",
                              })}
                              id="street-address"
                              autoComplete="street-address"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.street && (
                            <p className="text-red-500">
                              {errors.street.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2 sm:col-start-1">
                          <label
                            htmlFor="city"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            City
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("city", {
                                required: "city missing",
                              })}
                              id="city"
                              autoComplete="address-level2"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.city && (
                            <p className="text-red-500">
                              {errors.city.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="region"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            State / Province
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("state", {
                                required: "State Missing",
                              })}
                              id="region"
                              autoComplete="address-level1"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.state && (
                            <p className="text-red-500">
                              {errors.state.message}
                            </p>
                          )}
                        </div>

                        <div className="sm:col-span-2">
                          <label
                            htmlFor="postal-code"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ZIP / Postal code
                          </label>
                          <div className="mt-2">
                            <input
                              type="text"
                              {...register("pincode", {
                                required: "Pincode Missing",
                              })}
                              id="postal-code"
                              autoComplete="postal-code"
                              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                          {errors.pincode && (
                            <p className="text-red-500">
                              {errors.pincode.message}
                            </p>
                          )}
                          <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button
                              type="reset"
                              className="text-sm font-semibold leading-6 text-gray-900"
                            >
                              Reset
                            </button>
                            <button
                              type="submit"
                              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                              Add Address
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <ul role="list" className="divide-y divide-gray-100">
                      {user.address.map((address, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between gap-x-6 py-5"
                        >
                          <div className="flex min-w-0 gap-x-4">
                            <input
                              id="address"
                              name="address"
                              onChange={handleAddress}
                              value={idx}
                              type="radio"
                              checked={shippingaddress == user.address[idx]}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <div className="min-w-0 flex-auto">
                              <p className="text-sm font-semibold leading-6 text-gray-900">
                                {address.name}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.street}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.pincode}
                              </p>
                              <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                {address.state}
                              </p>
                            </div>
                          </div>
                          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                            <p className="text-sm leading-6 text-gray-900">
                              {address.phone}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-10 space-y-10">
                      <fieldset>
                        <legend className="text-sm font-semibold leading-6 text-gray-900">
                          Payment Method
                        </legend>
                        <div className="mt-6 space-y-6">
                          <div className="flex items-center gap-x-3">
                            <input
                              id="cash"
                              name="payment"
                              onChange={handlePayment}
                              value="cash"
                              type="radio"
                              checked={paymentmethod == "cash"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="cash"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Cash
                            </label>
                          </div>
                          <div className="flex items-center gap-x-3">
                            <input
                              id="card"
                              name="payment"
                              type="radio"
                              value="card"
                              onChange={handlePayment}
                              checked={paymentmethod == "card"}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor="card"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Card
                            </label>
                          </div>
                        </div>
                      </fieldset>
                    </div>
                  </div>
                </form>
              </div>
              <div className="lg:col-span-3">
                <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
                  <h2 className="text-4xl font-bold tracking-tight text-gray-900">
                    Cart
                  </h2>
                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200"
                      >
                        {product.map((product, idx) => (
                          <li key={idx} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={product.product.image.imageUrl}
                                alt={product.product.image.imageUrl}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={product.href}>
                                      {product.product.name}
                                    </a>
                                  </h3>
                                  <p className="ml-4">
                                    &#8377;{product.product.new_price}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  {" "}
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Qty
                                  </label>{" "}
                                  <select name="quantity" id="quantity">
                                    <option value={product.quantity}>
                                      {product.quantity}
                                    </option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                    <option value="4">Four</option>
                                  </select>
                                </div>
                                <div className="flex">
                                  <button
                                    type="button"
                                    onClick={(e) =>
                                      handleDelete(
                                        e,
                                        userId,
                                        product.product._id
                                      )
                                    }
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>&#8377;{totalPrice}</p>
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Shipping and taxes calculated at checkout.
                    </p>
                    <div className="mt-6">
                      <div
                        onClick={handleOrder}
                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 cursor-pointer text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                      >
                        Pay and order now
                      </div>
                    </div>
                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                      <p>
                        or{" "}
                        <button
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          <Link to="/">Continue Shopping</Link>
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <CircularProgress sx={{ fontSize: 48 }} />{" "}
            <div>Fetching Data From Server</div>
          </div>
        </div>
      )}

      {/* {currentOrder && currentOrder[0].paymentmethod == "card" &&  <Navigate to="/payment-checkout"/> } */}
    </>
  );
};

export default Checkout;
