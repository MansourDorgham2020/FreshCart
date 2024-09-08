import React from 'react'
import style from './Cart.module.css'
import { useContext } from 'react'
import { CartContext } from '../../Context/CartContext'
import { useEffect } from 'react'
import { useState } from 'react'
import Product from './../Products/Products';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom'





export default function Cart() {

  let{getLoggedUserCart,updateCartProductQuantity,deleteCartItem,deleteCartItems,nOfCartItems,setnOfCartItems} = useContext(CartContext);
  const [CartDetails,setCartDetails] = useState(null);


  async function getCartItems() {
    let response = await getLoggedUserCart();
    // console.log(response.data.data);
    
    if(response.data.status == "success"){
      setCartDetails(response.data.data)
    }
  }

  async function updateProduct(id,count) {
    

    if(count == 0){
      deleteProduct(id)
    }
    else{
      let response = await updateCartProductQuantity(id,count)
      // console.log(response.data.data);
      if(response.data.status == "success"){
        setCartDetails(response.data.data)
        toast.success("Product Updated Successfully")
      }
      else{
        toast.error("Error in Updated")
      }
    } 
  }
  async function deleteProduct(id) {
    let response = await deleteCartItem(id)
    // console.log(response.data.data);
    if(response.data.status == "success"){
      setnOfCartItems(nOfCartItems-1)
      setCartDetails(response.data.data)
      toast.success("Product Delete Successfully")
    }
    else{
      toast.error("Error in Delete")
    }
     
  }
  async function deleteProducts() {
    let response = await deleteCartItems()
    // console.log(response.data);
    if(response.data.message == "success"){
      setCartDetails(null)
      toast.success("Products Delete Successfully")
    }
    else{
      toast.error("Error in Delete")
    }
     
  }


  useEffect(()=>{
    getCartItems()
    updateProduct()
    deleteProduct()
  },[])

  return (
    <>

    {CartDetails?.products.length > 0 ? <> <h2 className='text-2xl  font-bold capitalize my-4 text-black'>total price: <span className='text-2xl text-emerald-600 font-bold'>{CartDetails?.totalCartPrice}</span></h2>

<div className=" overflow-x-auto shadow-md sm:rounded-lg">
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
          Qty
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
    {CartDetails?.products.map((product)=><tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button  onClick={()=>updateProduct(product.product.id,product.count - 1 )} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span>{product.count}</span>
            </div>
            <button onClick={()=>updateProduct(product.product.id,product.count + 1 )} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-emerald-600  dark:text-white">
          {product.price}<span className='text-black'>$</span>
        </td>
        <td className="px-6 py-4">
          <a href="#" onClick={()=>deleteProduct(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>)}
      
    </tbody>
  </table>
</div>
<Link to={`/checkout`}>
<button className='btn capitalize mt-5'>check out</button>
</Link>
<button onClick={()=>deleteProducts()} className='btn capitalize my-5'>clear your cart</button>
</>:<h2 className='text-emerald-600 text-3xl font-bold flex justify-center items-center text-center my-20 mx-auto'>
          There's No Products in Your Cart
          <i class="fa-solid fa-cart-shopping fa-lg"></i>
        </h2>
 }
    

   


          
    </>
  )
}
