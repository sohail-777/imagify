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