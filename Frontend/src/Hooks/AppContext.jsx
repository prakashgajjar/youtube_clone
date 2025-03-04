import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [auth  , setAuth] = useState(false);
    const [showChannel , setShowChannel] = useState(false);
    const [showCreateChannel , setShowCreateChannel] = useState(false);
    const [userDetail , setUserDetail] = useState(null);
    const [channelExits , setChannelExits] = useState(false);
    const [channelDetail , setChannelDetail ] = useState();
    const [showUploadVideo , setShowUploadVideo] = useState(false);
    return (
        <AppContext.Provider value={{auth,setAuth , showUploadVideo , setShowUploadVideo,channelDetail,setChannelDetail , setChannelExits ,channelExits ,setShowChannel,showChannel ,showCreateChannel,setShowCreateChannel , userDetail , setUserDetail}}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = ()=>{
    return useContext(AppContext);
}