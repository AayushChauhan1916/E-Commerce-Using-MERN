import React from "react";
import Productdetail from "../features/productdetail/Productdetail.jsx";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { productSelector } from "../features/product-list/productslice.js";
// import  all_product from '../assets/all_product.js';

const Productdetails = () => {
  const all_product = useSelector(productSelector);
  const { id } = useParams();
  const product = all_product.filter((el) => {
    return el._id == id;
  });

  return <Productdetail product={product}/>;
};

export default Productdetails;
