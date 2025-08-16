import React, { useContext, useEffect, useState } from 'react'
import {assets} from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "motion/react"
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

    const [state, setState] =useState('Login')

    const {setShowLogin, backendUrl, setToken, setUser} = useContext(AppContext);

    const [name, setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    //so, as we had creted a form to take the values and now, we have to store tos value somewhere so thatw e could use them or send them to the database so, for that we will be cretaing these states


    //we wrote "async" as we are dealing with "api's" 
    const onSubmitHandler = async (e) =>{
        e.preventDefault();//this will prevent the webpage from reloadign whenevr we will submit the form
        //we have to make the api csll using "axios" so, dont forget to install it
        try{

            //here according to our state value we will send the data to the api

            //we will post the "email and password" values to the "api" with the link form the backendd+/api/user/login

            //simple we have to post the values to the api which is in this format:- http://localhost:4000/api/user/login and we can get this entire thing like this as the starting is in the .env file we access it from there then, we will add the remaining parts
            //and send the data they have to recive 
            if(state==='Login'){
               const {data} = await axios.post(backendUrl + '/api/user/login', {email,password}) 

                //if the "success" attrivute we gave is "true" then we will get a "token" generated and now, we will set that token that value
                if(data.sucess){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    //we are setting the token, user we get from the backend as "response" and we have to store the "token" in the localstorage also 
                    setShowLogin(false)
                    //as aour login is done we have to stop dispalying the form
                }else{
                    //now, whenever the login is not successful then we have to display a mesage whcih we will be doing by using "TOSTIFY"
                    //details in read me
                    toast.error(data.message)

                }
            }else{//here as state is not login we will use the "regestaration api"
               const {data} = await axios.post(backendUrl + '/api/user/register', {name,email,password})  

               if(data.sucess){
                    setToken(data.token)
                    setUser(data.user)
                    localStorage.setItem('token',data.token)
                    setShowLogin(false)
               }else{
                    toast.error(data.message)
               }
            }
        }catch(error){
            toast.error(data.message)
        }
    }

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
    <div className='fixed left-0 right-0 top-0 bottom-0 z-10 backdrop-blur-sm bg-black/30 flex justify-center items-center'>
      
        <motion.form onSubmit={onSubmitHandler} 
        initial={{opacity:0.2,y:50}}
        transition={{duration:0.3}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        className='relative bg-white p-10 rounded-xl text-slate-500'>
            <h1 className='text-center text-2xl text-neutral-700 font-medium'>{state}</h1>

            <p className='text-sm'>Welcome back! Please Sign in to continue</p>

            {state !== 'Login' && <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-5'>
                <img src={assets.user_icon} alt='' />
                <input onChange={e =>setName(e.target.value)} value={name} type='text' className="outline-none text-sm" placeholder='Full Name' required />
                {/*here we used  */}
            </div>}

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.email_icon} alt='' />
                <input onChange={e =>setEmail(e.target.value)} value={email} type='Email' className="outline-none text-sm" placeholder='Email id' required />
            </div>

            <div className='border px-6 py-2 flex items-center gap-2 rounded-full mt-4'>
                <img src={assets.lock_icon} alt='' />
                <input onChange={e =>setPassword(e.target.value)} value={password} type='password' className="outline-none text-sm" placeholder='Password' required />
            </div>

            <p className='text-smm text-blue-600 my-4 cursor-pointer'>Forgot Password</p>

            <button className='bg-blue-600 w-full text-white py-2 rounded-full'>{state === 'Login' ? 'Login' : 'create account'}</button>

            {state ==='Login' ? <p className='mt-5 text-center'>Don't have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Sign Up')} >Sign up</span> </p>
            :
            <p className='mt-5 text-center'>Already have an account? <span className='text-blue-600 cursor-pointer' onClick={()=>setState('Login')} >Login</span> </p>}

            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" className='absolute top-5 right-5 cursor-pointer' />
        </motion.form>

    </div>
  )
}

export default Login
