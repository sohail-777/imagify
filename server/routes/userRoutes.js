import express from 'express'
import {registerUser, loginUser, userCredits} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'


//here we will be creating an API's
//to create an api we will be firstly needing a contoller function its like the thing that gets called or activated whenevr an call is made to that api
//its like when we call the api the contoller_function gets triggered and depnding upon the api request or the thing which the api is designed for we will be getting the outputs 
//like if we create an api which takes inputs or if we create an api which takes inouts and gives us some outputs 
//here the regissterUser function takes iniuts like name,email, password and gives us an token and all so, thats how we make api's for a specific purpose

const userRouter = express.Router()
//express.Router() creates a mini Express application for handling routes related to users.
//This keeps code organized — instead of putting all routes in server.js, you make a separate file just for user-related routes.

//in the userRouter we will be creating an end ponit and provide a controller_function at that endpoint

//Controller functions contain the actual logic for what happens when someone hits the /register or /login endpoint.

userRouter.post('/register', registerUser)

userRouter.post('/login', loginUser)

//userRouter.post() defines a POST request handler for /register.

//When someone sends a POST request to /register (e.g., sending JSON with email & password), Express will run the registerUser function.

//it silply handles the "post kind of actions" like if someone has did something related "post" kind od things like "filling a form" something like that then such things will be handled by the "express" by sending all the requests to the "rigisterUser" contoller function

//simple whenever someone posts something in the "/request" express will send that data to the "userRegister" thats it

userRouter.post('/credits', userAuth, userCredits)

//here as we will be getting the "user_id" from the "middleware" so, it is important to add the middleware also

//when we first do the api testin gor this we will get "login again , not authorized something like that"

//to fix it:- we have to provide it a token

export default userRouter

//whenever we hit:-

//http://localhost:400/api/user/register in the backend then it will hit the register API endpoint and will execute the "registerUser" function

//now, we will be testing these api's or th links which we made

//""""POSTMAN"""""

//to test them we need a tool called "POSTMAN"

//go to web browser search for "postman download"

//after we doenmload it we have to "create a new collection" 
//then we have to giive it a "name"
//then we have to give the api address which we  had created like "http://localhost:400/api/user/register" there
//then we have to select the method like what kind of method does that api accept like do we have to "post" or simply send some inputs to taht api to get something as a response or "get",do we have to just run it so that we can get some data out of it or "put" etc.. there are a lot of methods whcih we can perform on an api it depends on how we are using it
//there in our api teisng we gave our api there and as it's a post method we gave it some data in the "raw" from inside an "object" we have the data we designed the api for the name, email, password etc. and then we waited for the output or the result
//if the api is working properly we will get "200 OK" which indicates that our api is working well and we ahve to check the outputs and compare if we are getting them same as we expecteing them to be 
//we can try multiple testcases like giving the "email" wrong and seeing whct output we will be getting and give the "password" wrong and seeing what output we will be getting and in the same way we do it fro all the inouts and see the expected outputs if they are matching or not
//in this way we use multiple testcases and improve our api's performance for multiple testcases and make our api optimized 
//to check if the data we gave it here by using taht api is gettinng saved in our database or not we can go to our "cluster" we had created and then go to the "data overview" and then look there if the data has been added or not
