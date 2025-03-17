import React from 'react'
import RunnigVideo from '../videoStream/RunnigVideo'
import { useAppContext } from '../../Hooks/AppContext'
import Chennal from '../Features/Chennal'
import VideoBar from '../videoStream/VideoBar'
import GroupVideoAi from '../AIVideoSuggetion/GroupVideoAi'

const SteamVideoPage = () => {
  const { showChannel } = useAppContext()
  return (
    <div className='text-white w-screen h-screen flex-col   overflow-y-auto  flex gap-6 '>
      <div>
        <div>
          <div>
            {
              showChannel && <div className='absolute right-10 z-[100]'>
                <div className='relative z-[100]'>
                  <Chennal />
                </div>
              </div>
            }
          </div>
        </div>
        <div className="h-full flex" >
          <div className='ml-24 mt-5 w-[71.5%] '>
            <div>
              <RunnigVideo />
            </div>
            <div>
              <h1 className='font-bold text-xl font-sans mt-2'>love - Mashup slowed and reverb song || mind relax lofi song|</h1>
            </div>
            <div id='channelName'>
              <VideoBar />
            </div>
            <div className='bg-[#303030] rounded-xl h-28 w-full'>
            
            </div>
          </div>
          <div className=' w-[30%] ml-4 mt-5'>
            <GroupVideoAi />
          </div>
        </div>
        <div className='h-[40px]'>
        </div>
      </div>
    </div>
  )
}

export default SteamVideoPage