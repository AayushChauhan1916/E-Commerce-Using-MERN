import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentOrder } from "./orderSlice";
import { fetchOrderAsync, selectFetchStatus } from "./orderSlice";
import { selectUserOrder } from "./orderSlice";
import { selectCustomer } from "../customer/custSlice";
import emptyOrder from "../../assets/emptyOrder.jpg";
import CircularProgress from "@mui/material/CircularProgress";

const Order = () => {
  const user = useSelector(selectCustomer);
  const fetchStatus = useSelector(selectFetchStatus);
  const order = useSelector(selectUserOrder);
  // console.log(order);

  const id = user._id;
  const dispatch = useDispatch();
  const currOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    if (user) {
      dispatch(fetchOrderAsync({ id }));
    }
  }, [dispatch, currOrder, user]);

  const changeColor = (status) => {
    switch (status) {
      case "Pending":
        return `return bg-cyan-200 text-cyan-700`;
      case "Delivered":
        return `bg-emerald-200 text-emerald-700`;
      case "Cancelled":
        return `bg-red-200 text-red-700`;
      case "Dispatch":
        return `bg-yellow-200 text-yellow-700`;
    }
  };

  return (
    <>
      {fetchStatus == "loading" ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <CircularProgress sx={{ fontSize: 48 }} />{" "}
            <div>Fetching Data From Server</div>
          </div>
        </div>
      ) : (
        <>
          {order.length > 0 ? (
            <div>
              <div className="text-2xl flex justify-center align-middle font-bold text-gray-700 mt-5">
                Your Orders
              </div>
              {order.map((item, idx) => {
                return (
                  <div
                    key={idx}
                    className="mx-auto mb-5 mt-6 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white"
                  >
                    <h2 className="text-xl font-bold tracking-tight text-gray-900">
                      Order : {item._id}
                    </h2>

                    <h2 className="text-lg font-bold tracking-tight text-gray-900">
                      Status :{" "}
                      <span
                        className={`text-center align-baseline inline-flex px-4 py-3 mr-auto items-center font-semibold text-[.95rem] leading-none rounded-lg ${changeColor(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </h2>

                    <div className="mt-8">
                      <div className="flow-root">
                        <ul
                          role="list"
                          className="-my-6 divide-y divide-gray-200"
                        >
                          {item.product[0].map((product, idx) => (
                            <li key={idx} className="flex py-6">
                              {/* console.log(product) */}
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
                                      ₹{product.product.new_price}
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
                                      Qty :
                                    </label>{" "}
                                    <span className="text-md font-bold">
                                      {product.quantity}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <hr className="w-80 mt-5 md:w-4/5 lg:w-3/5 xl:w-2/5 mx-auto border-t-2 border-gray-500 font-bold" />

                    <div className="text-xl inline-block mr-10 font-bold text-gray-700 mt-5">
                      Shipping Address :{" "}
                    </div>
                    <ul
                      role="list"
                      className="divide-y divide-gray-100 inline-block"
                    >
                      {item.shippingaddress.map((address, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between gap-x-6 py-5"
                        >
                          <div className="flex min-w-0 gap-x-4">
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

                    <div className="text-sm font-bold text-gray-700 mt-5">
                      Payment :{" "}
                      <div className="inline text-red-500">
                        {item.paymentmethod}
                      </div>{" "}
                    </div>
                    <div className="text-sm font-bold text-gray-700 mt-5">
                      Purchase Date :
                      <div className="inline text-red-500">
                        &nbsp;{new Date(item.orderDate).toLocaleString()}
                      </div>
                    </div>

                    <div className="mt-8">
                      <div className="flex justify-between pb-5 text-base font-medium text-gray-900">
                        <p>Total Value</p>
                        <p>₹{item.totalAmount}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <img
                src={emptyOrder}
                alt="Cartoon Image"
                className="w-80 h-90 mx-auto mb-4"
              />
              <p className="text-lg font-bold text-gray-700">
                Nothing to Show !! Place Some Order
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Order;
