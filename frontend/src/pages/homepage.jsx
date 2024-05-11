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
    const response = await fetch(
      "https://e-commerce-mern-backend-six.vercel.app/api/newproduct"
    );
    const data = await response.json();
    if (data.success) {
      setNewProduct(data.newProducts);
      setNewProductBoolean(true);
    } else {
      console.log("failed to fetch new products");
    }
  };

  const fetchPopularProduct = async () => {
    const response = await fetch(
      "https://e-commerce-mern-backend-six.vercel.app/api/popular"
    );
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
      toast.success("Logged in Successfully");
    }
  }, [user]);

  return (
    <>
      <Maincarousel />
      {newProductBoolean && (
        <HomeSectionCarousel data={newProduct} section={"New Arrivals"} />
      )}
      {popularBoolean && (
        <HomeSectionCarousel data={popular} section={"Most Selling's"} />
      )}

      {/*       
      <HomeSectionCarousel data={gounsPage1} section={"Gouns"} />
      <HomeSectionCarousel data={saree} section={"Sarees"} />  */}
    </>
  );
};

export default Homepage;
