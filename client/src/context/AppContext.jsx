//we create variables and functions and alos states and we can use them wherever we want for simplicity and easy understanding

//we dont have to create them again and agin in each and every component saves times and effort

import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import axios from 'axios' 
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);

    const [showLogin, setShowLogin] = useState(false);

    const [token, setToken] = useState(localStorage.getItem('token'))
    //so, whenever a "token" gets created in the backend we need to store that somewhare and use iit for our forntend also
    //we know that the token gets stored in the "localstorage" so, we will access it from theera nd use it in the forntend

    const [credit, setCredit] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    //here we are storing the url in a variable so that we can access it in all the files thats teh main use of this "CONTEXT"

    //now, we have to get the credits dynamically through the api o, we will amke a function for it

    const navigate = useNavigate()

    const loadCreditsData = async()=>{
        try{
            const {data} = await axios.get(backendUrl + '/api/user/credits',{headers: {token}} )

            if(data.success){
                setCredit(data.credits)
                setUser(data.user)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }

    //now, we are creating a function to make an API call to "generate an image" api

    const generateImage = async(prompt)=>{
        try{
            const {data} = await axios.post(backendUrl + '/api/image/generate-image', {prompt},{headers:{token}})

            if(data.success){
               loadCreditsData()
               //we will load the sredits as we will be using one credit to generate the image
               return data.resultImage 
            }else{
                toast.error(data.message)
                //dispaly the erroe then check the creditBalnce

                loadCreditsData()
                //if creditBalnce is less then we have to aitomatically "navigate" to the "buy credit" page

                if(data.creditBalance === 0){
                    navigate('/buy')
                }
            }
        }catch(error){
            toast.error(error.message)
        }
    }

    const logout = ()=>{
        localStorage.removeItem('token');
        setToken('')
        setUser(null)
    }
    //if a person wants to logout then we have to temperoraly remove his data from the localstorage although it will be saved in the database
    //as long as the user is logged in the token stays the same in the localstorage

    useEffect(()=>{
        if(token){
            loadCreditsData()
        }
    },[token])//useEffect gets executed whenever the token gets changes or if a new token is generated so, the function gets executed like if u had logged in then u will get a token generated so, the functionw ill automaticallky execute

    const value = {
        user,setUser,showLogin, setShowLogin,backendUrl,token, setToken, credit, setCredit, loadCreditsData,logout,generateImage
    }
    //through this we will be sending the variables to all the files

    return ( 
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider