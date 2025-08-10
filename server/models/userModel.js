import mongoose from "mongoose";

//we created this models folder to store the user details and transaction details

const  userSchema = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type:String, required:true, unique:true},
    password:{type: String, required:true},
    creditBalance:{type:Number,default:5},//here default indicates the default value that must be showed or diplayed
})

const userModel = mongoose.models.user || mongoose.model("user",userSchema)
//here we are creating a model with name user and the schema it will use is the userSchema

//the mongoose.model("user",userSchema) indicates that we are creating a model using the "mongoose.model" and "user" is going to be the model name and "userSchema" is going to be the schema which the model will be using 

//but, the problem is that this model will be keep on getting created for everytime which is really not required so, to handle this problem

//we written mongoose.models.user which indicates the usage of a model called "user" if it is already created or if it already existes and the || symbol is ther to signify that if there is no model called "user" then we will create it using the syntax and if it is already present then we will be using that user model only

//we use mongoose.model to create a model and mongoose.models to slect a model form the present models

//here we are creating models with a specific schemas as we will be using these specific or self made models to store our data regarding a aspecific task or a specific purpose 

//like for suppose the user model is here to store the details of the user like his name password and other stuff and if we have another purpose of like products requested then they will be stored in an other model which we will be creating to store the product data

//so, for specific purpose or specific data things we will make specific models and use them

export default userModel;

//using this usermodel the we have to create multiple "API's" which will help the user login and logout and do other stuff