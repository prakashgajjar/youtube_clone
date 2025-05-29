import RightSide from '../Main/RightSide'
import TagLine from '../Main/TagLine'
import Chennal from '../Features/Chennal'
import { useAppContext } from '../../Hooks/AppContext'
import CreateChannel from '../Features/CreateChannel'
import { useEffect } from 'react'


const HomePage = () => {

  const { showChannel, showCreateChannel , setShowCreateChannel  } = useAppContext();

  useEffect(()=>{
    setShowCreateChannel(false)
  },[])


  return (
    <div className='h-full w-screen  overflow-hidden main'>
      <div className='mt-1 flex '>
        <div className='h-full w-full  mt-2 overflow-hidden'>
          <div>
            <TagLine />
          </div>
          <div className='mt-7  overflow-y-auto absolute h-[850px] custom-scroll    '>
            <div>
              <RightSide />
            </div>
          </div>
        </div>
        {
          showChannel && <div className='absolute right-10 z-[100]'>
            <div className='relative z-[100]'>
              <Chennal />
            </div>
          </div>
        }
      </div>
      {
        showCreateChannel && <div className="z-50 absolute inset-0 flex items-center justify-center">
          <CreateChannel />
        </div>
      }

    </div>
  )
}

export default HomePage