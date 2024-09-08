import React, { useState } from 'react'
import style from './Login.module.css'
import {useFormik} from 'formik'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import * as Yup from 'yup'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../../Context/UserContext'







export default function Login() {

  let {userLogin,setuserLogin} =useContext(UserContext);

  const navigate = useNavigate()
  const[ApiError ,setApiError] = useState("")
  const[isLoading ,setisLoading] = useState(false)

  function  handleLogin(values) {
    setisLoading(true)
    axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .then( (res)=>{
      setisLoading(false)      
      if(res.data.message == "success"){
        localStorage.setItem("userToken",res.data.token)
        setuserLogin(res.data.token)
        navigate("/")
        
      }
      
    })
    .catch( (res)=>{
      setisLoading(false)
      setApiError(res.response.data.message)
      
    })
    
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("invalid email")
    .required("email is requried"),
    password: Yup.string()
    .matches(/^[A-Za-z0-9]{6,10}$/,"password should be between 6 and 10 char")
    .required("password is required"),
  })


  let formik = useFormik({
    initialValues: {
      email:"",
      password:"",
    },
    validationSchema : validationSchema,
    onSubmit :handleLogin
  })




  return <>


  <div className='my-5'>
    {ApiError ? <div className='w-1/4 text-white font-bold bg-red-600 rounded-lg mx-auto p-3'>{ApiError}</div> : null}
    
  
  <h2 className='font-bold text-2xl text-emerald-600 mb-3'>Login Now</h2>
    
    <form onSubmit={formik.handleSubmit} className="max-w-md mx-auto">
    


    <div className="relative z-0 w-full mb-5 group">
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
        <label htmlFor="email" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
    </div>

    {formik.errors.email && formik.touched.email ? <div class="p-4 mb-4 text-sm text-red-600">
      {formik.errors.email}
    </div> : null}



    <div className="relative z-0 w-full mb-5 group">
        <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-emerald-500 focus:outline-none focus:ring-0 focus:border-emerald-600 peer" placeholder=" "  />
        <label htmlFor="password" className=" left-0 peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-focus:dark:text-emerald-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password</label>
    </div>

    {formik.errors.password && formik.touched.password ? <div class="p-4 mb-4 text-sm text-red-600">
      {formik.errors.password}
    </div> : null}


    <div className='flex gap-4 items-center'>
    <button type="submit" className="text-white bg-emerald-700 hover:bg-emerald-800 focus:ring-4 focus:outline-none focus:ring-emerald-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-600">{isLoading ? <i className='fas fa-spinner'></i> : "Login"}</button>
    <Link to={'/register'}><span className='text-blue-500 underline'>Create Account?</span></Link>
    </div>

    </form>
  </div>
      
  </>
  
}