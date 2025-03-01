import React from 'react'
import { useAppContext } from '../../Hooks/AppContext'
import { Link } from 'react-router-dom';

const ProfileIcon = () => {
    const { auth ,setShowChannel , showChannel } = useAppContext();
    return (
        <div className='flex'>
            {
                auth ? (

                    <div className='w-10 h-10 flex justify-center items-center' onClick={()=>{
                        setShowChannel(!showChannel);
                    }} >
                        <img src="images/bg06.jpg" alt="" className='w-8 h-8 rounded-full' srcset="" />
                    </div>
                ) : (
                    <div className='w-24 h-9 flex justify-center items-center border gap-2 mt-[2px] border-white rounded-full'>
                        <img src="logos/default_user.png" className='w-[25px]' alt="" srcset="" />
                        <Link className='text-white font-sans text-sm font-bold' to="/auth">Sign in</Link>
                    </div>
                )
            }
        </div>
    )
}

export default ProfileIcon