import React from 'react'
import style from './AllOrders.module.css'
import { OrderContext } from '../../Context/OrderContext';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


export default function AllOrders() {
  let{createCashOrder,getAllOrders,getUserOrders,cartId} = useContext(OrderContext);
  const [OrdersDetails,setOrdersDetails] = useState(null);


  async function getOrders() {
    let response = await getAllOrders();
    // console.log(response.data.data);
    
    if(response.data.status == "success"){
      setOrdersDetails(response.data.data)
    }
  }
  async function getUserOrder(cartId) {
    let response = await getUserOrders(cartId);
    console.log(response);
    
    if(response.data.status == "success"){
      setOrdersDetails(response.data.data)
    }
  }



  useEffect(()=>{
    getUserOrder()
    // getOrders()
  },[])




  return (
    <>

{OrdersDetails?.length > 0 ? <> <h2 className='text-2xl  font-bold capitalize my-4 text-black'>total price: <span className='text-2xl text-emerald-600 font-bold'>{OrdersDetails?.totalCartPrice}</span></h2>

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
    {OrdersDetails?.map((product)=><tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            
            <div>
              <span>{product.count}</span>
            </div>
            
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-emerald-600  dark:text-white">
          {product.price}<span className='text-black'>$</span>
        </td>
        <td className="px-6 py-4">
          <a href="#"  className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>)}
      
    </tbody>
  </table>
</div>
</>: <h2 className='text-emerald-600 text-3xl font-bold flex justify-center items-center text-center my-20 mx-auto'>
          There's No Orders
          <i className='fa-regular fa-face-sad-tear px-2 my-3'></i>
        </h2>}
 
    </>
  )
}
