import React from 'react'
import RunnigVideo from '../videoStream/RunnigVideo'
import { useAppContext } from '../../Hooks/AppContext'
import Chennal from '../Features/Chennal'
import VideoBar from '../videoStream/VideoBar'

const SteamVideoPage = () => {
  const {showChannel} = useAppContext()
  return (
    <div className='text-white'>
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
      <div className='ml-24 mt-5 '>
        <div>
          <RunnigVideo />
        </div>
        <div>
          <h1 className='font-bold text-xl font-sans mt-2'>love - Mashup slowed and reverb song || mind relax lofi song|</h1>
        </div>
        <div id='channelName'>
        <VideoBar />
        </div>
      </div>
    </div>
  )
}

export default SteamVideoPage