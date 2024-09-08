import React from 'react'
import style from './RecentProducts.module.css'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext'





export default function RecentProducts() {

  const[products,setproducts]=useState([]);
  let {addProductToCart,setnOfCartItems,nOfCartItems} = useContext(CartContext);
  let {addProductToWishList} = useContext(WishListContext);
  const [loading,setloading] = useState(false)
  const [currentId,setcurrentId] = useState(0)

  async function addToCart(id) {
    setcurrentId(id)
    setloading(true)
    let response = await addProductToCart(id)
    

    if(response.data.status == "success") {
      setnOfCartItems(nOfCartItems+1)
      toast.success(response.data.message);
      setloading(false)
    }
    else{
      toast.error(response.data.message);
      setloading(false)
    }
    
  }
  async function addToWishListt(id) {
    let response = await addProductToWishList(id)
    

    if(response.data.status == "success") {
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
    }
    
  }



  function getProducts() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then((res)=>{
      setproducts(res.data.data)
      
    })
    .catch((res)=>{})
  }

  useEffect(()=>{
    getProducts()
  },[])
  return (<>
    
  <div className=" mt-7">

  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"></label>
  <input type="email" id="email" aria-describedby="helper-text-explanation" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-700 block w-full p-2.5  dark:bg-blue-700 dark:border-blue-600 dark:placeholder-blue-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5" placeholder="search..."></input>
      <div className='flex flex-wrap  gap-1'>
      {products.length > 0 ? products.map((product)=>
      <div key={product.id} className=' w-full md:w-1/2 lg:w-1/5 xl:1/6 hover:shadow-xl  hover:shadow-emerald-300  border-2 border-emerald-700 rounded-lg my-4 hover:border-emerald-400 mx-auto'>
        
        <div className='product my-2 p-2'>
        <Link to={`productdetails/${product.id}/${product.category.name}`}>
          <img src={product.imageCover} className='w-full' alt="" />
          <h3 className=' text-emerald-500'>{product.category.name}</h3>
          <h3 className='font-semibold mb-1'>{product?.title.split(" ").slice(0,2).join(" ")}</h3>
          <div className='flex justify-between p-3'>
            <span>{product.price} EGP</span>
            <span><i className='fas fa-star text-yellow-400'></i>{product.ratingsAverage}</span>
          </div>
          </Link>
        
          <i onClick={()=>addToWishListt(product.id)} className="fas fa-solid fa-heart fa-xl text-black"></i>

          <button onClick={()=>addToCart(product.id)} className='btn'>{loading && currentId == product.id? (<i className='fas fa-spinner fa-spin'></i>) : ("Add to Cart")}</button>
        </div>
        
      </div>
    )
    
     :<div class="sk-chase mx-auto">
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
     <div class="sk-chase-dot"></div>
   </div>}
   </div>
  </div>
    
</>
  )
}
