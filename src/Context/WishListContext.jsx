import axios from "axios";
import { createContext } from "react";
import { useState } from "react";




export let WishListContext = createContext()

export default function WishListContextProvider(props){

    let headers = {
        token : localStorage.getItem("userToken")
    }

    function addProductToWishList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {productId : productId} , {headers})
        .then((res)=>res)
        .catch((err)=> err)
        
        
        
    }

    function getLoggedUserWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
        
    }

    function deleteWishListItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
        .then((res)=>res)
        .catch((err)=>err)
        
    }

    


    return <WishListContext.Provider value={{addProductToWishList,getLoggedUserWishList,deleteWishListItem}}>
        {props.children}
    </WishListContext.Provider>
}