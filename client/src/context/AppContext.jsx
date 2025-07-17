//we create variables and functions and alos states and we can use them wherever we want for simplicity and easy understanding

//we dont have to create them again and agin in each and every component saves times and effort

import { createContext, useState } from "react";

export const AppContext = createContext()

const AppContextProvider = (props)=>{
    const [user, setUser] = useState(null);

    const value = {
        user,setUser
    }

    return ( 
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider