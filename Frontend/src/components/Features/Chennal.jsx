import React from 'react'
import { Link } from 'react-router-dom'
import { useAppContext } from '../../Hooks/AppContext'

const Chennal = () => {
    const {setShowCreateChannel} = useAppContext();
    return (
        <div className='text-white h-56 w-[300px] bg-[#282828] rounded-xl'>
            <div className='flex gap-5 pt-3' >
                <div className='ml-3 '>
                    <img src="images/bg06.jpg" className='w-10 h-10 mt-2 rounded-full' alt="" />
                </div>
                <div className='flex flex-col'>
                    <div className='flex flex-col '>
                        <h1 className='text-lg font-semibold'>PRAKASH</h1>
                        <h1 className='text-sm'>Hello.Prakash</h1>
                    </div>
                    <div>
                        <h1 className='text-blue-400 cursor-pointer'
                        onClick={()=>{
                            setShowCreateChannel(true);
                        }}
                        >Create your chennal</h1>
                    </div>
                </div>
            </div>
            <hr className='mt-4 opacity-30'/>
            <div className='flex gap-4 mt-5 items-center   '>
                <div>
                    <img src="logos/signOut.png" className='w-[18px] ml-5' alt=""  />
                </div>
                <div>
                    <h1 className='text-md font-sans font-semibold'>sign out</h1>
                </div>
               
            </div>
            <hr  className='mt-4 opacity-30'/>
        </div>
    )
}

export default Chennal