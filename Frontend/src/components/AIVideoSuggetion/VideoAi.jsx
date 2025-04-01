import React, { useEffect } from 'react'
import axios from 'axios'
import { useAppContext } from '../../Hooks/AppContext'
import moment from 'moment'

const VideoAi = ({video}) => {

  return (
    <div>
        <div className='flex  justify-start items-center'>
            <div className='w-44 h-24 rounded-xl ml-1'>
                <img src={`${video.snippet.thumbnails.medium.url}`} alt="" className='w-full h-full rounded-xl'  />
            </div>
            <div className='flex-col flex ml-2 w-72  '>
                <h1 className='tracking-tight font-semibold w-full h-10 overflow-hidden text-sm  '>{video.snippet.title}</h1>
                <h1 className='text-sm opacity-60'>{video.snippet.channelTitle}</h1>
                <div className='flex gap-2 '>
                    <span className='opacity-60'>{moment(video.snippet.publishedAt).fromNow()}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default VideoAi