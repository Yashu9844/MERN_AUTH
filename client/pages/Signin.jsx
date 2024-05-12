import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { signInFailure,signInStart,signInSuccess } from '../src/redux/user/userSlice.js'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import OAuth from '../src/components/OAuth.jsx'


const Signin = () => {
  const currentUser = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const [formData ,setFormData] = useState({})
 const {loading,error} = useSelector((state)=>state.user)
  const navigate = useNavigate()




  const handleChange = (e)=>{
  
    setFormData(
      {
        ...formData,
        [e.target.id]:e.target.value
      }
    )
    

  }

   const handleSubmit= async (e)=>{
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin',
    {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body:JSON.stringify(formData)
    })
        const data = await res.json();
     
        dispatch(signInSuccess(data))
        
        if(data.success === false){
          dispatch(signInFailure())
          return;
        }
        
        navigate("/")
    }
    
    
    catch (error) {
      dispatch(signInFailure(error))
    }
   }



  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className='text-3xl text-center font-semibold my-7 '>Sign In</h1>


     <form  onSubmit={handleSubmit}   className='flex flex-col gap-5'>
      
      <input type="email" placeholder='email ' className='border p-3 rounded-lg ' id='email' onChange={handleChange} />
      <input type="password" placeholder='password ' className='border p-3 rounded-lg ' id='password' onChange={handleChange} />
      <button disabled={loading} className='bg-slate-700 text-white uppercase rounded-lg p-3 hover:opacity-95 disabled:opacity-80 '>
        {loading ? 'Loading...' : 'Sign In'}
      </button>
      <OAuth/>

     </form>
     <div className="flex gap-1 mt-3">
      <p>Don't have an account ?</p>
      <Link to={"/sign-Up"}>
        <span className='text-blue-700'>Sign Up</span>
      </Link>
     </div>
       {error && <p className='text-red-500 mt-5'>{error}</p>}

    </div>
  )
}

export default Signin

