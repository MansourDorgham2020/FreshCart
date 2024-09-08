import React from 'react'
import style from './WishList.module.css'
import { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import Product from './../Products/Products';
import { toast } from 'react-hot-toast';
import { WishListContext } from './../../Context/WishListContext';





export default function WishList() {

  let{addProductToWishList,getLoggedUserWishList,deleteWishListItem} = useContext(WishListContext);
  const [WishListDetails,setWishListDetails] = useState(null);


  async function getWishListItems() {
    let response = await getLoggedUserWishList();
    console.log(response.data.data);
    
    if(response.data.status == "success"){
      setWishListDetails(response.data.data)
    }
  }

  
  async function deleteProduct(id) {
    let response = await deleteWishListItem(id)
    //console.log(response.data.data);
    if(response.data.status == "success"){
      setWishListDetails(response.data.data)
      toast.success("Product Delete Successfully")
    }
    else{
      toast.error("Error in Delete")
    }
     
  }
  


  useEffect(()=>{
    getWishListItems()
  },[])

  return (
    <>

{ WishListDetails?.length > 0 ? <> 

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {WishListDetails?.map((product)=>
    <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.title}
        </td>
        <td className="px-6 py-4 font-semibold text-emerald-600  dark:text-white">
          {product.price}<span className='text-black'>$</span>
        </td>
        <td className="px-6 py-4">
          <a href="#" onClick={()=>deleteProduct(product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>)}
      
    </tbody>
  </table>
</div>
</>: <h2 className='text-emerald-600 text-3xl font-bold flex justify-center items-center text-center my-20 mx-auto'>
          There's No Products in Your Wishlist
          <i class="fa-solid fa-heart-circle-exclamation fa-lg"></i>
        </h2>}


    </>
  )
}


