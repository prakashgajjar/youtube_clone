import React, { useState } from 'react'
import { useAppContext } from '../../Hooks/AppContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CreateChannel = () => {

    const {userDetail} = useAppContext();
    console.log(userDetail.data.user.user.email);

    const sendChannelData = async ()=>{
        try {             
        const responceData = await axios.post('http://localhost:3000/channel/create',{
            channelName: ChannelName,
            channelHandle: ChannelHandle,
            userId : userDetail.data.user.user._id,
            userEmail : userDetail.data.user.user.email
            },
            {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
        })
        if(responceData.status === 201){
            console.log(responceData)
            setShowCreateChannel(false)
        }
        } catch (error) {
            console.error(error.message);
        }
    }

    const [ChannelName, setChannelName] = useState("")
    const [ChannelHandle, setChannelHandle] = useState("")
    const { setShowCreateChannel } = useAppContext();
    const navigate = useNavigate();
    return (
        <div>
            <div >
                <div className='w-[738px] h-[605px] bg-[#212121] rounded-lg'>
                    <div className='text-white'>
                        <h1 className='text-3xl absolute pl-4 mt-4 font-sans font-semibold'>How you'll appear</h1>
                    </div>
                    <div className='flex justify-center items-center h-full'>
                        <div className='flex justify-center items-center flex-col gap-12'>
                            <div className=''>
                                <img src="logos/user.png" className='w-32' alt="" />
                            </div>
                            <div className='flex flex-col gap-5'>
                                <label htmlFor="name" className='text-sm absolute ml-2 mt-1 text-white opacity-25'>Name</label>
                                <input type="text" id='name' className='w-[456px] h-[54px] text-lg text-white bg-transparent font-sans font-semibold pt-4 pl-3 border border-1 border-white border-opacity-25 rounded-md' value={ChannelName} onChange={(e) => {
                                    setChannelName(e.target.value)
                                }} />
                                <label htmlFor="handle" className='text-sm absolute bottom-[428px] ml-2  text-white opacity-25'>Handle</label>
                                <input type="text" id='handle' className='w-[456px] h-[54px] bg-transparent text-lg text-white font-sans  pt-4 pl-3 font-semibold border border-1 border-white border-opacity-25 rounded-md' value={ChannelHandle} onChange={(e) => {
                                    setChannelHandle(e.target.value)
                                }} />
                            </div>
                            <div>
                                <h1 className='text-[10px] mt-8 w-[456px] text-white'>By clicking Create Channel you agree to YouTube's Terms of Service. Changes made to your name and profile picture are visible only on YouTube and not other Google services. Learn more</h1>
                            </div>

                        </div>
                        <div className='flex gap-5 text-white  absolute bottom-[210px] font-semibold font-sans right-[630px]'>
                            <h1 className='cursor-pointer' onClick={() => {
                                setShowCreateChannel(false)
                            }}>Cancel</h1>
                            <h1 className='text-blue-600 cursor-pointer' onClick={()=>{
                                console.log("Channel Name: ", ChannelName)
                                console.log("Channel Handle: ", ChannelHandle)
                                setShowCreateChannel(false);
                                sendChannelData();
                                 navigate(`/channel/${userDetail.data.user.user._id}`)
                            }}>Create Channel</h1>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateChannel