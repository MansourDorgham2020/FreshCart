import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import Brands from './Components/Brands/Brands'
import Categories from './Components/Categories/Categories'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import Products from './Components/Products/Products'
import Cart from './Components/Cart/Cart'
import Notfound from './Components/Notfound/Notfound'
import CounterContextProvider from './Context/CounterCOntext'
import UserContextProvider from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import CartContextProvider from './Context/CartContext'
import { Toaster } from 'react-hot-toast';
import WishList from './Components/WishList/WishList';
import WishListContextProvider from './Context/WishListContext'
import Checkout from './Components/Checkout/Checkout';
import AllOrders from './Components/AllOrders/AllOrders';
import OrderContextProvider, { OrderContext } from './Context/OrderContext'









let x = createBrowserRouter([
  {path:"",element: <Layout/>,children:[
    {index:true, element: <ProtectedRoute><Home/></ProtectedRoute> },
    {path:"cart", element: <ProtectedRoute><Cart/></ProtectedRoute> },
    {path:"allorders", element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
    {path:"checkout", element: <ProtectedRoute><Checkout/></ProtectedRoute> },
    {path:"wishlist", element: <ProtectedRoute><WishList/></ProtectedRoute> },
    {path:"productdetails/:id/:category", element: <ProtectedRoute><ProductDetails/></ProtectedRoute> },
    {path:"Brands", element: <ProtectedRoute><Brands/></ProtectedRoute>},
    {path:"categories", element: <ProtectedRoute><Categories/></ProtectedRoute>},
    {path:"login", element: <Login/>},
    {path:"register", element:<Register/>},
    {path:"products", element: <ProtectedRoute><Products/></ProtectedRoute>},
    {path:"*", element: <Notfound/>},
    ]}
])

export default function App() {
  return(
  <>
  
  <UserContextProvider>
    <CounterContextProvider>
    <CartContextProvider>
    <WishListContextProvider>
    <OrderContextProvider>
      <RouterProvider router={x}></RouterProvider>
      <Toaster/>
    </OrderContextProvider>
    </WishListContextProvider>
    </CartContextProvider>
    </CounterContextProvider>
  </UserContextProvider>
  
  

  </>
);

}



