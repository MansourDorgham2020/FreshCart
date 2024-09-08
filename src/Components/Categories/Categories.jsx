import React from 'react'
import style from './Categories.module.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'



export default function Categories() {

  const[categories,setcategories]=useState([])

  function getCategorirs() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
      
      setcategories(res.data.data)
      
    })
    .catch((res)=>{})
  }

  useEffect(()=>{
    getCategorirs()
  },[])
  return (<>
    
  {<div className="flex flex-wrap gap-1">
      {categories.length > 0 ? categories.map((category)=>
      <div key={category.id} className='w-full md:w-1/2 lg:w-1/5 xl:1/6 hover:shadow-xl  hover:shadow-emerald-300  border-2 border-emerald-700 rounded-lg my-4 hover:border-emerald-400 mx-auto'>
        
        <div className='product my-2 p-2'>
          <img src={category.image} className='w-full h-[250px] object-cover' alt="" />
          <h3 className=' text-emerald-500 my-3 font-bold text-2xl'>{category.name}</h3>
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