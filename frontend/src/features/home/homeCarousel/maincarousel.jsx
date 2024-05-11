import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { maincarouseldata } from './maincarouseldata';

const Maincarousel = () => {
    const items = maincarouseldata.map((item,index)=>{
        return <img key={index} src={item.image} alt="{item.path}" className='cursor-pointer' role='presentation'/>
    })
  return (
    <AliceCarousel
        items={items}
        // to disable arrow button
        disableButtonsControls
        autoPlay
        autoPlayInterval={2000}
        infinite
    />
  )
}

export default Maincarousel