import React from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'



export default function Brands() {

  const[Brands,setBrands]=useState([])

  function getBrands() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    .then((res)=>{
      console.log(res);
      
      setBrands(res.data.data)
      
    })
    .catch((res)=>{})
  }

  useEffect(()=>{
    getBrands()
  },[])
  return (<>

  
<h1 className='capitalize text-emerald-500 font-bold text-5xl text-center mt-9'>all brands</h1>
  {<div className="row">
      {Brands.length > 0 ? Brands.map((brand)=>
      <div key={brand.id} className='w-full md:w-1/2 lg:w-1/4 xl:1/6 hover:shadow-xl  hover:shadow-emerald-200  border-2 border-emerald-700 rounded-lg my-4 hover:border-emerald-500 mx-auto'>
        
        <div className='product my-2 p-2'>
          <img src={brand.image} className='w-full h-[220px] object-cover' alt="" />
          <h3 className='font-semibold mb-1 text-gray-600'>{brand.name}</h3>
        </div>
        
      </div>
    )
     :<div className="sk-chase mx-auto">
     <div className="sk-chase-dot"></div>
     <div className="sk-chase-dot"></div>
     <div className="sk-chase-dot"></div>
     <div className="sk-chase-dot"></div>
     <div className="sk-chase-dot"></div>
     <div className="sk-chase-dot"></div>
   </div>}

  </div>}
    
</>
  )
}
