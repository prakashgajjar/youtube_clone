import React, { useEffect, useState } from 'react'
import { useAppContext } from '../../Hooks/AppContext'
import axios from 'axios'

const ChannelPage = () => {
    const {userDetail, channelDetail , setShowCreateChannel} = useAppContext();
  return (
    <div>
        <div className='flex flex-col text-white '>
            <div className='rounded-xl'>
                <img src="/images/banner1.jpg" alt="" className='h-[203px] bg-zinc-800 rounded-xl w-[1300px]' />
            </div>
            <div className='flex gap-4 mt-10 items-center'>
                <div>
                    <img src="" alt="" className='bg-blue-500 w-[160px] h-[160px] rounded-full' />
                </div>
               <div className='flex flex-col'>
               <div className='flex flex-col gap-1'>
                    <h1 className='text-4xl font-bold'>{channelDetail.channelName}</h1>
                    <h1 className='text-lg'>{channelDetail.ChannelHandle}</h1>
               <div className='flex gap-2 mt-2 -ml-1' >
               <div className='w-40 font-semibold flex justify-center items-center rounded-3xl whitespace-nowrap h-8 bg-white bg-opacity-10 text-white'>
                        <h1>Customize channel</h1>
                    </div>
                    <div className='w-40 font-semibold whitespace-nowrap h-8 flex justify-center items-center rounded-3xl bg-white bg-opacity-10 text-white'>
                        <h1>Manage videos</h1>
                    </div>
               </div>
                </div>
               </div>
            </div>
        </div>
    </div>
  )
}

export default ChannelPage