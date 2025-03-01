import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [auth  , setAuth] = useState(true);
    const [showChannel , setShowChannel] = useState(false);
    const [showCreateChannel , setShowCreateChannel] = useState(false);
    return (
        <AppContext.Provider value={{auth,setAuth ,setShowChannel,showChannel ,showCreateChannel,setShowCreateChannel}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext);
}