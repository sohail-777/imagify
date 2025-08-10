import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'


const PORT = process.env.PORT || 4000 //process.env.PORT is where the port number will be present in  the .env file or it will use 4000 as the port value
const app = express()

//now, we have to add the middleware to it whcih will be the usage of the express and core 
app.use(express.json())
app.use(cors())


await connectDB()//this syntax wil connect our express with the mongoDB dtabase


//once our connection is successful and when we run our server we will be getting a  message dispalyed that the "database got connected"
//and after this we will be getting the server running on port 4000 like this 

//so, it goes in an orderd format


app.use('/api/user',userRouter)
//.use() tells Express: “Whenever a request comes in that starts with this path, send it to this middleware or router.”

//In this case, '/api/user' is the base path and userRouter is the router that will handle requests under that path.

//Since you mounted it with '/api/user':
// /register becomes /api/user/register
// /login becomes /api/user/login

//Why this is useful

// Keeps your route files clean (you don’t have to write /api/user/... in every route in userRoutes.js).

// Lets you group related routes together.

// Makes your API paths predictable and easy to change in one place.

//simply we dont have to write long path names in th userRoutes page and can go with the easy and less confucing ones like /register

//If the client sends:

// code

// POST /api/user/register
// Express checks app.use('/api/user', userRouter) → matches because the path starts with /api/user.

// Removes /api/user from the URL temporarily and passes the rest (/register) to userRouter.

// userRouter sees /register and runs registerUser.


app.get('/', (req, res)=>res.send("API Working"))//whenevr we are in "/" this path we will get "API Woeking"
//we ahve two attributes whcih are request and response and when we are in this path "/" we are giving a response by sending the message
//this line defines a route like whenever we click "/" in th browser the localhost

//here (req,res) are callback functions wher request comes from client or user and response is given by the server

app.listen(PORT, ()=> console.log('Server running on port ' + PORT));//
//This tells Express: “Start the web server and listen for incoming requests on this specific port number.”
//() => console.log(...)-This is a callback function that runs after the server successfully starts.

