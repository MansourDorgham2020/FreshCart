import React from 'react'
import style from './Navbar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'



export default function Navbar() {

  let {userLogin,setuserLogin} = useContext(UserContext)
  let {nOfCartItems,setnOfCartItems}= useContext(CartContext)
  let navigate = useNavigate()
  function singout() {
    localStorage.removeItem("userToken");
    setuserLogin(null)
    navigate("/login")

    
  }

  return (
    <>

<nav className=" border-gray-200 fixed top-0 left-0 right-0 bg-slate-100 z-20">
    <div className="flex flex-wrap justify-center md:justify-between items-center mx-auto max-w-screen-xl p-4">
        <div className='flex items-center gap-5'>
        <Link to="" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="Flowbite Logo" width="120px" />
        </Link>
        {userLogin  !=null ?<ul className='flex gap-4'>
              <li><Link className='text-gray-700 hover:text-emerald-400' to="">Home</Link></li>
              <li><Link className='text-gray-700 hover:text-emerald-400' to="cart">Cart</Link></li>
              <li><Link className='text-gray-700 hover:text-emerald-400' to="wishlist">Wish List</Link></li>
              <li><Link className='text-gray-700 hover:text-emerald-400' to="products">Products</Link></li>
              <li><Link className='text-gray-700 hover:text-emerald-400' to="categories">Categories</Link></li>
              <li><Link className='text-gray-700 hover:text-emerald-400' to="brands">Brands</Link></li>
        </ul> :null}
        </div>

        <div className="flex items-center space-x-6 rtl:space-x-reverse text-gray-700">
          <div className="icons flex gap-5">
            <i className='fab fa-facebook'></i>
            <i className='fab fa-linkedin'></i>
            <i className='fab fa-youtube'></i>
            <i className='fab fa-tiktok'></i>
            <i className='fab fa-twitter'></i>
            <Link to={`/cart`}>
            <i className="fa-solid fa-cart-shopping"><div className='absolute bg-emerald-600  text-white rounded-full size-5 flex items-center justify-center top-[10] right-[-10]'>{nOfCartItems}</div></i>
            </Link>
          </div>
          {userLogin !=null ?<span onClick={singout}  className="text-sm  text-blue-600  hover:underline cursor-pointer">SignOut</span> : <div className="links flex gap-3">
            <Link to="login" className="text-sm  text-blue-600  hover:underline">Login</Link>
            <Link to="register" className="text-sm  text-blue-600  hover:underline">Register</Link>
            </div>}
            
        </div>
    </div>
</nav>


    
    



      
    </>
  )
}
