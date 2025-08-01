import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'


const PORT = process.env.PORT || 4000 //process.env.PORT is where the port number will be present in  the .env file or it will use 4000 as the port value
const app = express()

//now, we have to add the middleware to it whcih will be the usage of the express and core 
app.use(express.json())
app.use(cors())


await connectDB()//this syntax wil connect our express with the mongoDB dtabase

app.get('/', (req, res)=>res.send("API Working"))//whenevr we are in "/" this path we will get "API Woeking"
//we ahve two attributes whcih are request and response and when we are in this path "/" we are giving a response by sending the message
//this line defines a route like whenever we click "/" in th browser the localhost

//here (req,res) are callback functions wher request comes from client or user and response is given by the server

app.listen(PORT, ()=> console.log('Server running on port ' + PORT));//
//This tells Express: “Start the web server and listen for incoming requests on this specific port number.”
//() => console.log(...)-This is a callback function that runs after the server successfully starts.

