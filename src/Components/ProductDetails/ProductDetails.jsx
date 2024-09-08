import React from 'react'
import style from './ProductDetails.module.css'
import {useParams } from "react-router-dom";
import axios from "axios"
import {useEffect,useState} from "react";
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';




export default function ProductDetails() {
  const[product,setproduct]=useState(null)
  const[relatedProducts,setrelatedProducts]=useState([])
  let {id,category} = useParams()

  let {addProductToCart} = useContext(CartContext);

  async function addToCart(id) {
    let response = await addProductToCart(id)
    //console.log(response);
    
    if(response.data.status == "success") {
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
    
  }


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:1000,
  };
  
  
  function getproduct(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    .then((res)=> {
      //console.log(res.data.data);
      setproduct(res.data.data)
      
      
    })
    .catch((res)=>{
      console.log("res");
      
      
    })
    
  }

  function getAllProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
      let related = res.data.data.filter((product) => product.category.name == category)
      setrelatedProducts(related)
      
    })
    .catch((res)=>{
      console.log(res);
      

    })
    
  }



  useEffect(()=>{
    getproduct(id);
    getAllProducts()

  },[id,category]);

  return (
    <>
     
     <div className="row items-center">
      <div className="w-1/4">
      <Slider {...settings} className=''>
      {product?.images.map((src)=><img src={src} className='w-full'/>)}
      </Slider>
      </div>
      <div className="w-3/4 p-5">
        <h3 className='font-bold capitalize text-2xl'>{product?.title}</h3>
        <h4 className="text-gray-600 my-4">{product?.description}</h4>
        <h4 className="">{product?.category.name}</h4>
        <div className="flex justify-between p-3">
            <span>{product?.price} EGP</span>
            <span><i className="fas fa-star text-yellow-400"></i>{product?.ratingsAverage}</span>
          </div>
          <button onClick={()=>addToCart(product.id)} className='btn'>Add to Cart</button>
        
      
      </div>
     </div>
     
     <div className="row">
      {relatedProducts.length > 0 ? relatedProducts.map((product)=>
      <div key={product.id} className='w-full md:w-1/3 lg:w-1/4 xl:1/6'>
        
        <div className='product my-2 p-2'>
        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
          <img src={product.imageCover} className='w-full' alt="" />
          <h3 className=' text-emerald-500'>{product.category.name}</h3>
          <h3 className='font-semibold mb-1'>{product?.title.split(" ").slice(0,2).join(" ")}</h3>
          <div className='flex justify-between p-3'>
            <span>{product.price} EGP</span>
            <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
          </div>
          </Link>
          <button onClick={()=>addToCart(product.id)} className='btn'>Add to Cart</button>
        </div>
        
      </div>
    )
     :<div class="sk-chase">
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
   </div>}

  </div>
    
      
    </>
  )
}
