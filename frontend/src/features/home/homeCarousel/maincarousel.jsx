import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { maincarouseldata } from "./maincarouseldata";
import { Link } from "react-router-dom";

const Maincarousel = () => {
  const items = maincarouseldata.map((item, index) => {
    return (
      <Link to="/women" key={index}>
        <img
          src={item.image}
          alt="{item.path}"
          className="cursor-pointer"
          role="presentation"
        />
      </Link>
    );
  });
  return (
    <AliceCarousel
      items={items}
      // to disable arrow button
      disableButtonsControls
      autoPlay
      autoPlayInterval={3000}
      infinite
    />
  );
};

export default Maincarousel;
