import SubscriptionPannel from "./SubscriptionPannel"
import { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
const GroupSubPannel = () => {
    const navigate = useNavigate();
    const getSubscriptions = async () => {
        try {

            const responce = await axios.get('http://localhost:3000/subscriptions', {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (responce.status == 200) {
                console.log(responce.data.user.subscribedChannels)
                setChannelData(responce.data.user.subscribedChannels)
            } else {
                console.log("Error getting history video");
            }
        } catch (error) {
            console.log(error);
        }

    }
    useEffect(() => {
        getSubscriptions();
    }, [])


    const [channelData, setChannelData] = useState([])
    return (
        <div>
            <div className="h-12 flex justify-start font-bold  ml-[10px] items-center">
                <h1>Subscriptions</h1>
            </div>
            <div className="flex flex-col gap-2">
                {
                   channelData && channelData.map((data,index)=>{
                     return   <div key={index} onClick={()=>{
                        navigate(`/channel/${data._id}`)
                     }}>
                            <SubscriptionPannel  channel={data}/>
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default GroupSubPannel