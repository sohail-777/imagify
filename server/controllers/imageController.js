import userModel from "../models/userModel.js"
import axios from "axios"
import FormData from 'form-data'

//we had already installed this while creating only

//creating an "API" which takes "prompt" and then generates an image

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

        //This is the body of your request — it contains the parameters the API needs (for example: prompt text, image size, style, etc.).

        //now, we will send this data to the "api"

        //by appending the required things next step is to make the entire "API_REQUEST"

        //axios is used to make the specific "api call" or "api request" here we used the "post" method to send the data to the api and we will get something in "response"

        //x-api-key is the authentication header the API expects.

        // process.env.CLIPDROP_API means you’re pulling your API key from environment variables — good practice so you don’t hardcode secrets in your code.

        const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formData, {
            headers: {
                'x-api-key': process.env.CLIPDROP_API,
            },
            responseType: 'arraybuffer'
        });

        //responsetype:-
        
        //This tells Axios:
        // “Don’t treat the response as JSON or text — treat it as raw binary data.”

        // Since the API sends back an image, it’s returned as a sequence of bytes (array buffer) rather than a string.

        //response is stored in the "data"

        //here we will be the getting the resposne in "arrayBuffer" w should convert it in the "Base64" format

        //const { data } = ...

        // Axios returns a response object, usually like { data, status, headers, config, ... }.

        // The curly braces { data } is object destructuring — you’re pulling just the data property (which will be the raw image bytes) into a variable called data.

        const base64Image = Buffer.from(data, 'binary').toString('base64');
        //Buffer.from(data, 'binary')

        // Takes your raw binary data (data from the API) and creates a Node.js Buffer object from it.

        // 'binary' here tells Node to interpret the incoming data as binary.

        // .toString('base64')

        // Converts the binary buffer into a Base64-encoded string.

        // This string can now be sent as plain text in JSON, or used in a Data URL.

        //in case of other types of datas we have to be having a understanding about what type of data we are getting in what can we convert it

        const resultImage = `data:image/png;base64,${base64Image}`;

        //This creates a Data URL — a way to embed an image directly into HTML or CSS without linking to a separate file.

        // The format is:

        // data:[MIME type];base64,[Base64-encoded content]

        // data:image/png;base64, means “This is PNG image data, encoded as Base64.”

        // ${base64Image} inserts your encoded image content.

        //now, we will get the image in response but, before that we have to deduct the userCredits as he had used the api to generate an image which is one credit

        await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})

        res.json({success:true, message:"Image generated", creditBalance:user.creditBalance-1,resultImage})

    }catch (error){
        console.log(error.message)
        res.json({success:false, message:error.message})
    }
}