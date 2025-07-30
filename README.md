# imagify
a text to image convertor

always make sure ur in the folder wher u had installed the react to use "npm run dev"

to use tailwind css:-

go to google and search for it follow the guide it has given and make the changes it asked u to do in the :-
tailwind.config.js and postcss.config.js files

install react-router-dom to using routing

for the font family like the one which gets applied to all we are using the "outfit" of googlw hwich is a google font use it in the main css one only so taht it gets applied to all
use the code copy it and paste it in the index.css and make the entire font-family of the code to outfit

.always use capital letters for function component names like only the first letter shoud be capital

.add routing by using BrowserRouter in the main.jsx file

**WE HAVE TO CREATE A SEPERATE FILE IN THE CONTEXT FOLDER CALLED APPCONTEXT.JSX TO STORE ALL OUR STATES IN ONE PLACE SO THAT WE CAN EASILY ACCESS OUR STATES AND OTHERS AND USE THEM PROPERLY

**while using map function the .map(()=>()) inside the map we write a arrow function it should be off the form ()=>() not like ()=>{} as we are using it in a map function we have to maintain that syntax onlly but, in case of general functions we have to use it like ()=>{}

we usually write the key={index} or the ones which are using the map function as the usage of key={index} will make the access easy and efficient we also will be able to understand what we are accessing and also its index.

**the download attribute is used to download the corresponding thing mentioned in the fiels it can be a image or a text or anything

**an alternative of "teronary opertaor":- value or condition && (whatever u want to render) if the values "true" u will get the thing rendered if its false we wont get anything similarly if the condition is true u will get things rendered otherwise u wont get anything syntax:- {value or condition && (the thing u want to render)}

this is used if u want to render something depending bupon a condition we can use teronary opertaors also and the above mentioned one also.

.u can use it in case of multiple optipns like if u wnat to reder something dpending upon itd true or false value we can do this for multiple ones but, incase of teronary oprtaor we can only do it for two things

for animation we are usung the ""FRAMER MOTION"" 

open terminal and add "npm install motion" to install all the packages

import this in whatever component u want to add animations to import { motion } from "motion/react"

to use it in the element where u want to add animation just follow ths syntax:-<motion.element_name>

"we can install an extension called "AUTO REMANE TAG" if we are chabding the name of the opemimg tag like if i want to change <div> to <motion.div> i should also go to the clising tag and change its name from </div> to </motion.div> manually .

so, to automate this we have to use some extension like auto rename tag which automatically renames the closing tag if we are renaming tge opening tag




"""  #### BACKEND #### """"


.create a server folder where we write the entire server code

.to initilize  the backend with package.json by opening the folder in integrated terminal and type npm init which will initilize the package.json which has all the dependencies and all

now , we have to make changes init so that we could make use of some of the keywords to access the entire file or folder like if we enter npm run dev then our react will run simpilarly if we want it to get chaged we can do the using the package.json file 

we can change the thing whoch we write in the terminal to anything we want here i had made a cahge by removing the "test" named one and all its content {"test": "echo \"Error: no test specified\" && exit 1",} we had removed this and now, if we click "npm run start" then it will execute the ""node server.js"" this file which is the main file.

now, as we have to perform the "import" operation we ahve to add "type":"module" so that we can perform the importing part

now, we have to install a lot of packages so that ours backend could work

in terminal do npm i packages names here i= install

.express=since we will be creating an express package in which only everythings going to be running like the entire backend

.cors - which helps in connecting the backend with the frontend

.dotenv - we have to create a dotenv file and run it in the backend server

.nodemon - this package will help us to restart the backend serevr whenever we will be making any changes in the code files

.form-data - 

.jsonwebtoken - thiss is used to add the authentication in our project

.mongoose - this package is used to connect our backend with the mongodb database

.axios - helps use to make the API call

.bcrypt - this helps in encrypting the password

.razorpay - using this we can add the online payment gateway

after we installed all these we will be getting the dependices in the package.json file

we have to create a ".env" file in which we are going to store the "secret keys" and all like API's etc

"EXPRESS APP":-

.now, we have to create an express app in server.js where 

now, we have to do all these mentioned in the server.js file

now, after completing till app.listen() part after everythings good 

open the integrated terminal type "npm run start" and enter it 

if everythings ok we will get the mesage "Server running on port 4000"

after we see this we have to go to the web browser "localhost:4000"
then we will be able to view our website in the browser we will gwt a message called "API Working"

with this we can say that our "simple express app" is ready

and our backend url is:- "localhost:4000"

if somethings not ok then fix it and this time we have to "stop the server"  before starting it again as we ahd made some chages so, 

afetr we ,make any changes in the code and in that case we have to firstly make the chages and then "stop the server"-> by clicking "ctrl+c" and after then click "y" or enter and then the server will be stopped and tehn we agin have to run it by using "npm run start" we have to follow this each time we are making any changes


so, as we can see that whenevr we are making new changes we have to stop and then again start the server which is a huge task so, we will make few changes in the package.json file which is we will add this:- "server": "nodemon server.js" by adding this whenever we will type "npm run server" the "nodemon server.js" will run 

now, the benefit is that now whenever we are making any changes in the server or user code we dont have to stop the server and then restart it again everything will automatically get updtaed with the help of the "nodemon" pacages use all we have to do is starte the server using "npm start server" if we are making nay changes after doing it then we have to just go to the page and refresh it the changes will be automatically updated without stoping and restarting the server which is really time saving and efficient 