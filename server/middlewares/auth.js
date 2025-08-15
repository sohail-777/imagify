//we are creating this auth.js to give the "user_id" to the "body"
//to handle things securely and avoid multiple users with same user_name or id we are using this for security purpose
//we will simply authorize or authenticate the user by using the "jwt_Secret" key
//we will get all these infromations from the "token"
//u might get a doubt like why do we need this suthentication so, its simple in case of places where "user_id" is the king depending upon which we will get some facilities like "credits" or "no_of_chances_left" or "time_left" which are "limited" for each user so, "user_id" holds a lot of value or power so, we cant jsut extract or get it from the user body just like that we need to "assure" hat whatever user_id we are getting is geninune so, for that we will be "authenticating" it which is a good paratice
//and a lot of cyberattacks or "malwares" can make the "user_id" get changed or taken over by some or other actions spo, to handle all such things we provide it extra security kind of thing by accessing it through "authentication"

import jwt from 'jsonwebtoken'

//we will be performing this suthentication by-> "getting the token or seeing if token is there or not" -> ""

//here the "next" is a method that gets performed when everything is correct and it will start the "usercontroler" fucntion "userCredits"

//so, this function will get immediately activated after the "api" fro credit balance gets hited 
//from here the "user_id" is secirely accessed and then sent to the "userCredit" controller function and from there we will be getting the "credit balance"

const userAuth = async (req, res, next) =>{
    const {token} = req.headers;
    //we will be looking for the token from the "req.headers"

    if(!token){
        return res.json({sucess:false, message:'Not Authorized. Login Again'});
    }//as token gets created only when a user is logged in or a user is refister so, in its absence we have to give message like "login again" as user is not found :- "no token" "no user"

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        //the token gets verified and if everyting is ok all the values wiill be stored in tokenDecode
        
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id
        }//if the id is present in that decoded token thwn, we iwll add that to the body with a name called "userID"
        else{
            return res.json({sucess:false, message:'Not Authorized. Login Again'});
        }

        next();
        
        //this method will call the "userCredit" controller function
        //so, as in the "routers" page we will be writing :-
        //userRouter.post('/credits', userAuth,userCredits)
        //the "next()" method will automatically move to the function or method present right next to it in the "router" page which is the "userCredits" controller function


    }catch(error){
        res.json({sucess:false, message:error.message});
    }

}

export default userAuth;