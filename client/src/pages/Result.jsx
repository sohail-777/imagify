import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { motion } from "motion/react"
import { AppContext } from '../context/AppContext'

const Result = () => {

  const [image, setImage] = useState(assets.sample_img_1) //initilize a state which has the sample_image one as we are frequently using it so that we can use it directlyt and alos for easy code writing

  const [isImageLoded, setIsImageLoded] = useState(false)//we had made this stte to check if the image is loded or not if the image is loded then we have to dispaly the generate another, download button if the image is not lode thenw ehave to dhow the enetr the text input field

  const [loading, setLoading] = useState(false)//we had created this state for showing or hiding the loding... thing 

  const [input, setInput] = useState('')//we created this to store the input eneetrd by the user

  const {generateImage} = useContext(AppContext)
  //we imported the generateimage function to generate the images from the Appcontext

  const onSubmitHandler = async (e) =>{
    e.preventDefault()
    setLoading(true)

    if(input){
      const image = await generateImage(input)
      if(image){
        setIsImageLoded(true)
        //the loding line gets disappered as soon as we get the image
        setImage(image)
      }
    }
    setLoading(false)
  }//here we creytyed this function to do the things when the submit button gets clicked in the form or the form gets submited then it will generate the image using the functions

  return (
    <motion.form 
    initial={{opacity:0.2,y:100}}
    transition={{duration:1}}
    whileInView={{opacity:1,y:0}}
    viewport={{once:true}}
    onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'>
    <div>
      <div className='relative'>

        {/* here in the image src={} we can use  assets.sample_img_1 or image(state)*/}
        <img src={image} alt="" className='max-w-sm rounded' />


        {/*here we used `` inside the classname to make sure that we are able to use the {} and write the teronary opertaors in it as we want the "blue line" to be visible only when the loding is true otherwise we want it to not be visible so, in order to do this we used the `` and the {} */}
        <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 {loding ? 'w-full transition-all duration-[10s]' : 'w-0' }` }/>
      </div>
      <p className={!loading ? 'hidden' : ''}>Loding....</p>
    </div>

    {!isImageLoded &&
    <div className='flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full'>

      {/*here we used the onchange function which causes or captures an event which we can use to take the value from that one and set it or enter it into the "input" state using the "setTnput" fucntion */}
      <input onChange={e=> setInput(e.target.value)} value={input} type='text' placeholder='Describe what you want to generate' className='flex-1 bg-transperent outline-none ml-g max-sm:w-20 placeholder-color' />

      <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 rounded-full'>Generate</button>
    </div>
    }

    {isImageLoded &&
    <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>

      <p onClick={()=>{setIsImageLoded(false)}} className='bg-transperent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>Generate Another</p>

      {/*here the download attribute is used to download the image it is a by default attribute which is present in the tailwindcss */}

      {/*here inside the "href" we gave iamge which is the sate we crfeated as we have to downlload the one hwich is there in the state like whatveer is present in the state we have to sownload by writing the backend we can access adynamic image which will get generated and get stored in the state called image nad we have to download that one only*/}
      <a href={image} download className='bg-zins-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
    </div>
    }
    </motion.form>
  )
}

export default Result
