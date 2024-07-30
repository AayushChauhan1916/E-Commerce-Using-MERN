import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart1,
  deleteFromCartAsync,
  selectCartStatus,
} from "./cartSlice";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";

import { selectCustomer } from "../customer/custSlice";

const Cart = () => {
  const user = useSelector(selectCustomer);
  const userId = user._id;
  const dispatch = useDispatch();
  const product = useSelector(selectCart1);
  const navigate = useNavigate();
  const totalPrice = product.reduce((amount, item) => {
    return item.quantity * item.product.new_price + amount;
  }, 0);
  const handleDelete = (e, userId, productId) => {
    e.preventDefault();
    toast.success("🛒 Item Removed ", {
      position: "bottom-left",
    });
    dispatch(deleteFromCartAsync({ productId, userId }));
  };

  return (
    <div className="mx-auto mt-6 max-w-7xl px-4 sm:px-6 lg:px-8 bg-white">
      <h2 className="text-4xl font-bold tracking-tight text-gray-900">Cart</h2>
      <div className="mt-8">
        <div className="flow-root">
          <ul role="list" className="-my-6 divide-y divide-gray-200">
            {product.map((product, idx) => (
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
                        <a href={product.href}>{product.product.name}</a>
                      </h3>
                      <p className="ml-4">₹{product.product.new_price}</p>
                    </div>
                    {/* <p className="mt-1 text-sm text-gray-500">
                      {product.color}
                    </p> */}
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
                          handleDelete(e, userId, product.product._id)
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

      {totalPrice == 0 ? (
        <div>
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-sm">
        <FaShoppingCart className="text-gray-500 w-16 h-16 mx-auto mb-4" />
        <h1 className="font-extrabold text-xl text-gray-800 mb-2">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-4">Looks like you haven't added anything to your cart yet. Browse our categories and discover our best deals!</p>
        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300">Start Shopping</Link>
      </div>
    </div>

        </div>
      ) : (
        <div className="mt-8">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>₹{totalPrice}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 cursor-pointer"
              to="/checkout"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p className="mb-4">
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
      )}
    </div>
    // <h1>aayush</h1>
  );
};

export default Cart;
