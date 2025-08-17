import React, { useContext } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const BuyCredit = () => {

  const {user, backendUrl, loadCreditsData, token, setShowLogin} =useContext(AppContext)//here we imported this "user" state as we have to make the last button get two types of texts if user is logged in then we have to display the button as "Purchase" if hes not logged in then se should display "Get Started"

  const navigate = useNavigate()
  //we created this so gthat whenevr payment is over we can go back to the home page

  const initPay =async(order)=>{
    //we have to complete this function by looking at the "1.2.2" whatever is  given ther to raech it refer the "readme" 
    //according to it add the razorpay key, id in the .env file of clinet

    //basically orders wil;l ahve all the data that we willl be gettingb from each phase in the userController function of the payment contoller function

    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount:order.amount,
      currency:order.currency,
      name:'Credits Payment',
      description: 'Credits Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler: async (response)=>{
        try{

          const {data} = await axios.post(backendUrl + '/api/user/verify-razor', response,{headers:{token}})

          if(data.success){
            //if the payment status is true then we will load the credits again
            //make the user go to home page
            //and make a notification apperar
            loadCreditsData();
            navigate('/')
            toast.success('Credit Added')
          }

        }catch(error){
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)

    rzp.open()
    //now, we are adding the razorpay form or we can call it the razorpay gateway through we can do our payment an it will get updtaed
  }

  const paymentRazorpay = async(planId) =>{
    try{

      if(!user){
        setShowLogin(true)//so, if the user is not available then we have to show the login details as it will be usless to make a payment if thers no user
      }
      //if user is there make the api call

      const {data} = await axios.post(backendUrl + '/api/user/pay-razor', {planId}, {headers:{token}})//this is like if we made a call to the api and the "token" is matched and the planId is also ok then we will get a positive resonse with success as true

      //if the success is true then we will be calling the "function" which will add the "order" that we will be getting oin response of the api call which has the amount, currency, recepit,
      if(data.success){
        initPay(data.order)
      }

    }catch(error){
      toast.error(error.message)
    }
  }
  return (
    <motion.div 
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    className='min-h-[80vh] text-center pt-14 mb-10'>
      <button className='border border-gray-400 px-10 py-10 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the Plan</h1>

      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index)=>(
          <div key={index} className='bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500'>
            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'><span className='text-3xl font-medium'>${item.price}</span> / {item.credits} credits</p>

            <button onClick={()=>paymentRazorpay(item.id)} className='w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52'>{user ? 'Purchase' : 'Get Started'}</button>
            {/*here the item.id is the "planId" which we will be getting from the type of plan we will be clicking as we had already defined the planid's at the ebginig only so, clciking on specific button will give the "id" automatically */}
          </div>
        ))}
      </div>


    </motion.div>
  )
}

export default BuyCredit
