import React, { useEffect, useState } from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import Slider from "react-slick";



export default function CategoriesSlider() {

  const[categorires,setcategories]=useState([])

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2,
    autoplay:true,
    autoplaySpeed:2000,
  };

  

  function getCategories(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      // console.log(res.data.data);
      setcategories(res.data.data)
      
      
      
    })
    .catch((res)=>{
      console.log(res);
      

    })
  }
  useEffect(()=>{
    getCategories()

  },[])

  return (
    <>
    <h2 className='text-start'>Shop Popular Categories</h2>
    <Slider {...settings}>
      {categorires.map((category)=> <div className=''>
        <img src={category.image} className='w-full h-[200px] object-cover' alt="" />
        <h4>{category.name}</h4>
      </div>)}
    </Slider>

    
      
    </>
  )
}
