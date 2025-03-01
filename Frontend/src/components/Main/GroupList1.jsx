import React from 'react'
import ListComponent from '../components/ListComponent'

const GroupList1 = () => {
  return (
    <div className='flex flex-col gap-1'>
        <div>
            <ListComponent url="logos/home.png" name="Home"/>
        </div>
        <div>
            <ListComponent url="logos/shorts.png" name="Shorts"/>
        </div>
        <div>
            <ListComponent url="logos/subscription.png" name="Subscription"/>
        </div>
        <div>
            <hr className='mt-4 opacity-20' />
        </div>
    <div className='gap-1 flex flex-col mt-4'>
    <div>
        <ListComponent url="logos/history.png" name="History"/>
        </div>
        <div>
        <ListComponent url="logos/your_video.png" name="Your videos"/>
        </div>
        <div>
        <ListComponent url="logos/watch_later.png" name="Watch later"/>
        </div>
        <div>
        <ListComponent url="logos/like.png" name="Liked videos"/>
        </div>
    </div>
    </div>
  )
}

export default GroupList1