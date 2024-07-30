import React, { useEffect, useState } from "react";
import Maincarousel from "../features/home/homeCarousel/maincarousel";
import HomeSectionCarousel from "../features/home/homesectioncarousel/HomeSectionCarousel";
import { selectLoginInUserDetail } from "../features/Auth/authslice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Homepage = () => {
  const [newProduct, setNewProduct] = useState();
  const [newProductBoolean, setNewProductBoolean] = useState();
  const [popularBoolean, setpopularBoolean] = useState();
  const [popular, setPopular] = useState();
  const user = useSelector(selectLoginInUserDetail);

  const fetchNewProduct = async () => {
    const response = await fetch("/api/newproduct");
    const data = await response.json();
    if (data.success) {
      setNewProduct(data.newProducts);
      setNewProductBoolean(true);
    } else {
      console.log("failed to fetch new products");
    }
  };

  const fetchPopularProduct = async () => {
    const response = await fetch("/api/popular");
    const data = await response.json();
    if (data.success) {
      setPopular(data.mostSelling);
      setpopularBoolean(true);
    } else {
      console.log("failed to fetch new products");
    }
  };

  useEffect(() => {
    fetchNewProduct();
    fetchPopularProduct();
  }, []);

  useEffect(() => {
    if (user) {
      toast.success(`Welcome Back,${user.name}`);
    }
  }, [user]);

  return (
    <>
      <Maincarousel />
      <HomeSectionCarousel
        data={newProduct}
        section={"New Arrivals"}
        isLoading={!newProductBoolean}
      />

      <HomeSectionCarousel
        data={popular}
        section={"Most Selling's"}
        isLoading={!popularBoolean}
      />
    </>
  );
};

export default Homepage;
