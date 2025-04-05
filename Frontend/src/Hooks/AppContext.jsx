import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [auth, setAuth] = useState(false);
    const [showChannel, setShowChannel] = useState(false);
    const [showCreateChannel, setShowCreateChannel] = useState(false);
    const [userDetail, setUserDetail] = useState(null);
    const [channelExits, setChannelExits] = useState(false);
    const [channelDetail, setChannelDetail] = useState(null);
    const [showUploadVideo, setShowUploadVideo] = useState(false);
    const [FunctionCallVideo, setFunctionCallVideo] = useState(false);
    const [inputText , setInputText] = useState("");
    const [videoData, setVideoData] = useState(null);
    const [channelDetailHome, setChannelDetailHome] = useState(null);

    return (
        <AppContext.Provider value={{
            auth, setAuth, FunctionCallVideo, setFunctionCallVideo, 
            showUploadVideo, setShowUploadVideo, channelDetail, setChannelDetail, 
            setChannelExits, channelExits, setShowChannel, showChannel, 
            showCreateChannel, setShowCreateChannel, userDetail, setUserDetail , setVideoData,
            videoData,setInputText,inputText,channelDetailHome,setChannelDetailHome
        }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export { AppProvider, useAppContext };
export default AppContext;  
