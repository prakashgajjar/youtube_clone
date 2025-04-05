import  { useEffect, useState } from 'react'
import { useAppContext } from '../../Hooks/AppContext'
import { Link } from 'react-router-dom';
import axios from 'axios';

const ProfileIcon = () => {
    const { auth ,setShowChannel , showChannel,channelDetailHome ,setChannelDetailHome} = useAppContext();
    const getChanelDetail = async ()=>{
        try {
            // console.log(userDetail.data.user.user._id)
            const responce = await axios.post('http://localhost:3000/channel/detail',
                {
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
            }
            )
            if (responce.status == 201){
                console.log(responce.data.getChanneDetail);
                setChannelDetailHome(responce.data.getChanneDetail);
            }else{
                console.log("Error getting channel detail");
            }
    
        } catch (error) {
            console.error(error.message)
        }
        }

        useEffect(()=>{
            getChanelDetail()
        },[])
    return (
        <div className='flex'>
            {
                auth ? (

                    <div className='w-10 h-10 flex justify-center items-center' onClick={()=>{
                        setShowChannel(!showChannel);
                    }} >
                        <img src={`http://localhost:3000/images/${channelDetailHome && channelDetailHome.profilePicture}`} alt="" className='w-8 h-8 rounded-full'  />
                    </div>
                ) : (
                    <div className='w-24 h-9 flex justify-center items-center border gap-2 mt-[2px] border-white rounded-full'>
                        <img src="logos/default_user.png" className='w-[25px]' alt=""  />
                        <Link className='text-white font-sans text-sm font-bold' to="/auth">Sign in</Link>
                    </div>
                )
            }
        </div>
    )
}

export default ProfileIcon