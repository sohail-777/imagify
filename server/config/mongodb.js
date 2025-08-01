import mongoose from "mongoose";

const connectDB = async ()=>{

    mongoose.connection.on('connected', ()=>{
        console.log("Database connected")
    })//this is an event which occurs when the database gets connected successfilly the "connected" is the evnt whoch when done successfully dispalyes teh message in the termial that "Database connected"

    await mongoose.connect(`${process.env.MONGODB_URL}/imagify`)
}

//here we used tempalte literal `${}` to access  value from another file 
//process.env is used to access variables grom the .env file and process.env.variable_name is the syntax to access variables from that file

//export the function so that we can use it everywhere

export default connectDB;