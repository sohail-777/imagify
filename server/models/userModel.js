import mongoose from "mongoose";

//we created this models folder to store the user details and transaction details

const  userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type:String, required:true, unique:true},
    password
})