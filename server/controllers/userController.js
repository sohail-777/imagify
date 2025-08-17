//here we create multiple controller function for the regestration login logout and all

//to create these functions we have to be using the model which we created since it is for the user realted so, we import the "user" model

import userModel from "../models/userModel.js";

import bcrypt from "bcrypt";
//we impoted this to encrypt the password as we wil; be daeling with password related things here

import jwt from "jsonwebtoken";//here we imported this to create a token form the user "authentication"

import razorpay from 'razorpay';

import transactionModel from '../models/transactionModel.js'

//now, we are creating the controller functions like the ones for user regestration and all and we make it an async finction which has request and response

const registerUser = async (req,res)=>{
    try{
        const {name,email,password} = req.body;//firstly we will see if the person who is trying to register has eneterd all the details or not by accesing them from the body

        if(!name || !email || !password){
            return res.json({success:false, message: 'Missing Details'})
        } //now, we will check if the user had enterd evrything like all the detials or not, if even any one of them is also not mentioned 
        //then it will give a response with sucess criteria as "false" and we alos give a messge like "missing details" we use json to send all these parameters

        const salt = await bcrypt.genSalt(10)//this bcrypt.genSalt(10) function makes the "password" entered by the user to get encrypted and become secure and if we want to increase the security more then we have to increase the value inside the genSalt(10) from 10 to a higher value , the only thing is taht it would take more time to load and encrypt the password

        //using bcrypt (a password-hashing library) to generate a salt for securing passwords before saving them in MongoDB.
        //What is a salt?
        // A salt is a random string of characters added to a password before hashing it.

        // This prevents hackers from using precomputed lookup tables (rainbow tables) to crack the password.

        // Even if two users have the same password, their stored hashes will be different because each one gets its own salt.

        const hashedPassword = await bcrypt.hash(password, salt)

        //now, we are storing the password and the salt value whcih we get into a single variable called hashedPassword whcih we will store in the database so, its secure and encrypted also


        //now, we will craete an "object" which will take the users data and store it in the mongodb

        const userData = {
            name,
            email,
            password: hashedPassword
            //here we written like this because we want the users name and email to be eneterd as it is but, we want a protected password to be stored in the database so that hackers wont get it hacked so, we put it like this "password: hashedPassword" so, that protected password gets stored int he paassword column
        }
        //we have not sent the creditBalance data as it is defaultly kept as 5
        //same thing we go into the usermodel
        const newUser = new userModel(userData)
        //here we are creating a newuser variable whcih makes the data get stored in the mongodb database
        //we are sending the data into the user model which we created earlier and this entire thing is stored ina single variable so that we acn easily assign or access

        const user = await newUser.save()
        //this methos will save the newusers data in the database and in the variable user we can asscess that data

        const token =jwt.sign({id: user._id},process.env.JWT_SECRET)
        //now, we are geberating a token that will be sent in the "response" so that we can enable the login or regestration in the frontend
        //for each user a unique token will be generated using a unique id
        //here we written id:user._id which is whenever an user is created a unique id must be developed for that user so, the unique is developed with _id in this format so that each user can havew a unique identity

        //the second argument is the secret key which we will create in the ".env" file and use it here process.env is to access the variable or key from the ".env" file and the JWT_SECRET is the key name whose value we will be accessing

        res.json({success:true, token, user:{name:user.name}})
        //here in response we willl be sending the success as tru and the "token" whcih we created and also the user with attribute name which will be the users name only

        //is about creating a JSON Web Token (JWT) for authenticating users after they log in or register.

        //A JWT (JSON Web Token) is a secure, encoded string that proves the identity of a user.

        // It’s like a digital ticket that lets the user access protected routes (e.g., dashboard, profile).

        // Instead of storing login sessions on the server, JWT lets the client (browser or app) store the token and send it with every request.

        //so that insted of storing entire login it can store the token and for whatever requestes like payments etc we do it will use the token to authorize or authenticate the user so that only quthorized ones are using the website

        //Typical register/login flow:

        // User signs up or logs in.

        // Server verifies their password (using bcrypt like we explained before).

        // Server creates a JWT:

        // Server sends token to the client.

        // Client stores it (in localStorage, cookies, etc.) and sends it with future API requests.
    } catch(error){
        cosnole.log(error)
        res.json({success: false, message:error.message})

    }
}

//now, we are creating a user login controller function:-

const loginUser = async (req, res)=>{
    try{
        const {email, password} = req.body;
        //here we are accesing the the things that we require to move further or check for 
        const user= await userModel.findOne({email})
        //above in the regestration controller the user is just getting registerd so, his data is not present in the database we are seeing if hes already there or not if hes already there then we tell him to login if hes not there we tell him to complete the regestration and then we will send that completed data to our database so, we use different function and methods there

        //here as we are creating a login contoller we have used different functiona nd methods like here we will rquest the things we want from the body and then we will check if those things are  raelly existing ones in our database
        //in user variable we are finding the "email" from the "usermodel" weather the user with that specific mail is present or not in our database in that specific model

        if(!user){
            return res.json({success:false, message:'User does not exist'})
        }

        const isMatch = await bcrypt.compare(password,user.password)
        //first step is check for the user if the users available then, we will check for the password
        //to compare the password sent by the user and the pasword already present in the database we use bcrypt.comapre() method in whcih the arguments are the "password" which is the password entered by the user and "user.password" which is fetched from the database if its same then we will get teh varibale vakue as True if not false

        if(isMatch){
            const token =jwt.sign({id: user._id},process.env.JWT_SECRET)

            res.json({success:true, token, user:{name:user.name}})
        }else{
            return res.json({success:false, message:'Invalid credentials'})
            //if the password is not matching then we will respond by a message that they are invalid
        }
    } catch(error){ 
        console.log(error)
        res.json({success: false, message:error.message})
    }
}

const userCredits = async (req,res)=>{
    try{
        const {userId} = req.body //this was the initial way i did
        //here we will not get the user_id from the body insted we will be adding a middleware that will find the user_id from the token and that will add the user_id in the body


        //Right now, this function assumes the client sends the userId in the request body — which is not secure.

    
        // Better approach → Authentication middleware:

        // The client sends a JWT token in the request header.

        // Middleware verifies the token using your JWT_SECRET.

        // Middleware extracts the userId from the token payload.

        // Middleware adds userId to req.body or req.user before this function runs.

        // This way, users can’t fake someone else’s userId.

        //think of it like if we are having someone elses user id then we can get free credits or other free advantages so, if two users are having the same user id then one can use the credits of the other user so, thats why we always "get a message that this username already exists" to avoid these confucions we have to use this authentication


        const user = await userModel.findById(userId)
        //here we are going to find the user by the userid
        //userModel.findById(userId) is used to look for the user with that specific "id" in the mongodb
        //there can be two cases user is found ,user is not found
        //in case of user is found the "user" variable will be storing the entire user details like name ,email,password etc
        //in case of no user is found we will be getting a null value 
        //so, depending on the users presence or absence we give certain responses

        res.json({success:true,credits:user.creditBalance,user:{name:user.name}})
        //if the users found then we will give this response

    }catch(error){
        console.log(error.message)
        res.json({success: false, message:error.message})
    }
}

//this is razorpay instance
const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRETI
});

//controller function

const paymentRazorpay = async(req,res)=>{
    try{

        const {userId, planId} = req.body

        const userData = await userModel.findById(userId)

        if(!userId || !planId){
            return res.json({success:false, message:'Missing Details'})
        }

        //these are the basic details whoich we will be needing if we are doing a payment
        let credits, paln, amount, date

        //here we are using the switch case as depending upon the paln id we will be getting differnt values for each variables which we created

        switch (planId){
            case 'Basic':
                plan = 'Basic'
                credits = 100
                amount = 10
                break;
            
            case 'Advanced':
                plan = 'Advanced'
                credits = 500
                amount = 50
                break;
            
            case 'Business':
                plan = 'Business'
                credits = 5000
                amount = 250
                break;

            default:
                return res.json({success:false, message:'plan not found'})
        }

        date = Date.now();//thsi is used to store the current date/time stamp

        //now we will be cretaing an object which will be storing all the data that has been creted till now

        const transactionData ={
            userId, paln, amount, credits, date
        }

        //now, we need to store this data in the mongoDB database
        //so, we simply create a model in the "models" folder


        const newTransaction = await transactionModel.create(transactionData)
        //this send s all  the dta to the database

        //we ahve to craete the options depending upon which we will be having the data
        const options ={
            amount :amount*100,//as razor pay considers everything in ameerican dollars we have to convert it
            currency:process.env.currency,
            receipt:newTransaction._id//after creating a schema or a dataset in the database each schema will be having a aunique if=d created for it like for each entry of all the details of a  schema a specific "id" will be certaed for thats et of schema details we had eneterd and these id's are helpful in identifying the each individual persons details
            //as recepit is so imoortant as it holds that unique id value whcih is given for each transaction or amount payed per user
        }
        //now, we wil be creating an order using the razorpay

        await razorpayInstance.orders.create(options, (error, order)=>{
            if(error){
                console.log(error);
                return res.json({success:false,message:error})
            }
            res.json({success:true,order})
            //if eveything goes well we will return that order in response
        })


    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}


//after we had completed the payment we have to verify the payment which had happen by making another function for it

const verifyRazorpay = async(req,res)=>{
    try{

        const {razorpay_order_id}= req.body;//we will be getting this id in the console 

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        //here the information regarding the poprder will be fetched using the razorpay_order_id we are having

        if(orderInfo.status === 'paid'){
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            //if the status is paid then we will get that entire schemas data
            //here we are using the recipt's id which we will be getting stored in the orderInfo
            if(transactionData.payment){
                return res.json({success:false, message:'Payment Falied'})//we will be getting this response if the payment is already verified
            }
            //the above case is when payment is already verified and the payment status is "true"
            //but, if it is not verified then we have to add the credits to the users account

            const userData = await userModel.findById(transactionData.userId)//we will get the user details from the transactiondata's id property and get the user with taht id form the "usermodel"
            //now, in that userData all the datat of the user willl be available like his credits, anme, password and we acn take what we want

            const creditBalance = userData.creditBalance + transactionData.credits//here we are adding the current credits available and the credits user got by paying

            await userModel.findByIdAndUpdate(userData._id,{creditBalance})
            //here we are finding the user by the userid from userModel and we are updating the value of the variable which we had given in the {} here  which is the creditBalance

            //so, as the credits have been updated we also have to update the payment status to true so that we could avoid multiple payments or wrong status represntation

            await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})

            res.json({success:true, message:"Credits Added"})

        }else{
            res.json({success:false, message:"Payment Failed"})
        }

    }catch(error){
        console.log(error)
        res.json({success:false, message:error.message})
    }
}//this is the api to vrify the payment add its end point in the routes

export {registerUser, loginUser, userCredits,paymentRazorpay, verifyRazorpay}