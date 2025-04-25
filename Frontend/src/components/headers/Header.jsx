
import HeaderIcons from '../icons/HeaderIcons'
import SearchBar from './SearchBar'
import UploadVideoBtn from './UploadVideoBtn'
import SpeechIcons from '../icons/SpeechIcons'
import BellIcons from '../icons/BellIcons'
import ProfileIcon from '../icons/ProfileIcon'
import UploadVideo from '../components/UploadVideo'

const Header = () => {
  return (
    <div>
      <div className='flex justify-between items-center  px-4 '>
        <div className='flex gap-4 justify-center items-center mt-1'>
          <div className='-mt-1'>
            <HeaderIcons />
          </div>
          <div className='flex justify-center items-center -ml-2'>
            <img src="/logos/yt.png" className=' h-[55px]' alt="youtube"/>
            <h1 className='text-white -tracking-widest  font-[550]  text-[20px] -ml-2'>YouTube</h1>
          </div>
        </div>

        <div className='flex gap-4 justify-center items-center'>
          <div>
            <SearchBar />
          </div>
          <div>
            <SpeechIcons />
          </div>

        </div>
        <div className='flex gap-4'>
          <div className='cursor-pointer'>
            <UploadVideoBtn />
          </div>
          <div className='cursor-pointer'>
            <BellIcons/>
          </div>
          <div className='mr-[31px] cursor-pointer   '>
            <ProfileIcon/>
          </div>
        </div>
        <div className='absolute right-44 top-14 z-50'>
          <UploadVideo/>
        </div>
      </div>
    </div>
  )
}

export default Header