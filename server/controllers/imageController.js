import userModel from "../models/userModel"
import FormData from 'from-data'

//we had a;ready installed this while creating only

export const generateImage = async (req, res)=>{
    try{
        const {userId,prompt} = req.body

        const user = await userModel.findById(userId)
        //this will get an instance or something in the "user" variable by finding the given "user_id" from the "database" in the "usermodel" if its found we will get soem value stored in it if not there will be "null"
        //in user most probably all ur details like "name" "email","password","creditBalance" will be stored as those are the ones u taken at the start to create ur schema

        if(!user || !prompt){
            return res.json({success:false, message:"Missing Details"})
        }

        if(user.creditBalance === 0 || userModel.creditBalance < 0){
            return res.json({success:false, message: 'No Credit Balance', creditBalance: user.creditBalance})
        }


        //so, we will be getting the key from the "Clipboard" website 
        //now, we have to go to "docs" from there to "text to image" section 

        //there some instructions will be give likethe "api" which we need to hit and how to use it and what all databasese we should create like the "formData" one
        //and also the fromat in whcih things be there and some code and all we will get that info there
        //from taht info we hav to creata a form in this below format

        //so, form data is like a package where u need to send values or prompts
        //here we create "formdata" variable which has accesssed the FormData() package
        const formData = new FormData()
        //now, we will append the required thinsg intoit
        formData.append('prompt',prompt)
        //now, we will send this data to the "api"
        

    }catch (error){
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}