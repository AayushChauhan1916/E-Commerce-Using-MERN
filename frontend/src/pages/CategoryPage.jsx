import React from "react";
import CategoryCard from "../features/category/CategoryCard";
import { useSelector } from "react-redux";
import { productSelector } from "../features/product-list/productslice";
import { productStatus } from "../features/product-list/productslice";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const CategoryPage = ({ category }) => {
  const product1 = useSelector(productSelector);
  const productstatus = useSelector(productStatus);

  // Filter products based on the provided category
  const products = product1.filter(
    (el) => el.category.toLowerCase() === category.toLowerCase()
  );

  return (
    <>
      {productstatus === "loading" ? (
        <div className="flex justify-center items-center h-screen">
          <div className="text-center">
            <CircularProgress sx={{ fontSize: 48 }} />{" "}
            <div>Fetching Data From Server</div>
          </div>
        </div>
      ) : (
        <CategoryCard products={products}></CategoryCard>
      )}
    </>
  );
};

export default CategoryPage;
