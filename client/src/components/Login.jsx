import React from 'react'
import {assets} from '../assets/assets'
const Login = () => {
  return (
    <div className='absolute left-0 right-0 top-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      
        <form className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>Sign Up</h1>
            <p>Welcome back! Please Sign in to continue</p>
            <div>
                <img src={assets.user_icon} alt='' />
                <input type='text' placeholder='Full Name' required />
            </div>
        </form>

    </div>
  )
}

export default Login
