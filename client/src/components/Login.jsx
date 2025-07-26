import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext'
const Login = () => {

    const [state, setState] =useState('Login')

    const {setShowLogin} = useContext(AppContext);

    //this useEffect gets activated during the mount or unmount of the compoennt as we had specified it in the dependencied "[]"

    //this useeffect is activated when we mount or unmount things if we mount something the scrooling effect is disabled but, as soon as we unmount which is when we click the cross arrow we will unmount it and it results in the activation of the scrooling effect
    useEffect(()=>{
        //here this is DOM using which we can access various objects such as the body and its style and the styles property name and what value we should set to it "document" is alwys common one simply we can access various objects of the webpage and assign values or change them
        
        document.body.style.overflow = 'hidden';//mount

        return ()=>{
            document.body.style.overflow = 'unset';//unmount
        }
    },[])

  return (
    <div className='absolute left-0 right-0 top-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      
        <form className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>

            <p className='text-sm'>Welcome back! Please Sign in to continue</p>

            {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.user_icon} alt='' />
                <input type='text' className="outline-none text-sm" placeholder='Full Name' required />
            </div>}

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt='' />
                <input type='Email' className="outline-none text-sm" placeholder='Email id' required />
            </div>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt='' />
                <input type='password' className="outline-none text-sm" placeholder='Password' required />
            </div>

            <p className='text-smm text-blue-600 my-4 cursor-pointer'>Forgot Password</p>

            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'Login' : 'create account'}</button>

            {state ==='Login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')} >Sign up</span> </p>
            :
            <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')} >Login</span> </p>}

            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
        </form>

    </div>
  )
}

export default Login
