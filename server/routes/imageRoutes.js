import express from 'express'
import { generateImage } from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

const imageRouter = express.Router()

//here we had created a router using express.Router() it is llike an ini express app that handles routing

//now, we will be craeting an api 

imageRouter.post('/generate-image', userAuth, generateImage)

//her we create the api endpoint and what contoller functions dhould be activated when that endpoint is hit

//here we also aded the "userAuth" because of the "same resaon" that the contoller fucntion requires the "userId" whcih we can not manually give so, we add the authentication process and make it more secure 

export default imageRouter

//now, as we had cretad another router which has a slight change in its "api_path" so, beacuse of which we made an entirely different "router"

//"MAIN REASON":-

//the main reson why we created this "ROUTER" is beacuse previously we were working with the "user" related things like his "login" "regestration" and all so, it has an api endpoint like "/api/user"

//but now, we are working with someting different whcih is we are craeting an image here so, the api endpoint has to be slightly modified to "/api/image" so that we could hit it and get the outcome

//now, we will have to add this at the server.js





