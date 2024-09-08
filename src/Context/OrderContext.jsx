import axios from "axios";
import { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";




export let OrderContext = createContext()

export default function OrderContextProvider(props){

    let headers = {
        token : localStorage.getItem("userToken")
    };
    const [cartId,setcartId] = useState(0)

    function createCashOrder(cartId,formData) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shippingAddress : formData},{headers})
        .then((res)=>res)
        .catch((err)=>err)
        
    }

    function getAllOrders() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
        .then((res)=>res)
        .catch((err)=>err)
        
    }
    function getUserOrders(cartId) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${cartId}`)
        .then((res)=>res)
        .catch((err)=>err)
       
        
        
    }

    


    


    return <OrderContext.Provider value={{createCashOrder,getAllOrders,getUserOrders,cartId,setcartId}}>
        {props.children}
    </OrderContext.Provider>
}