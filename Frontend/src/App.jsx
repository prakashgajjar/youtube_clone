import './index.css'
import './App.css'
import HomePage from './components/Pages/HomePage'
import UserSign from './components/components/UserSign'
import { AppProvider } from './Hooks/AppContext'
import { Route, Routes, useLocation } from 'react-router-dom'
import ChannelPage from './components/Pages/ChannelPage'
import LeftSide from './components/Main/LeftSide'
import Header from './components/headers/Header'
import NotFound404 from './components/components/NotFound404'
import VideoUploadPage from './components/Pages/VideoUploadPage'
import AuthUser from './components/components/AuthUser'
import SteamVideoPage from './components/Pages/SteamVideoPage'
import GroupHistoryVideo from './components/WatchHistory/GroupHistoryVideo'
import GroupYourVideo from './components/YourVideos/GroupYourVideo'
import GroupLikedVideo from './components/LikedVideos/GroupLikedVideo'
import GroupWatchVideo from './components/WatchLater/GroupWatchVideo'

const App = () => {
  const location = useLocation();
  // const watchPageFound = /^[a-zA-Z0-9]+$/.test(location.pathname.substring(1));
  const watchPageFound = location.pathname !== "/watchlater" && location.pathname !== "/likedvideos" && location.pathname.startsWith('/channel') && location.pathname !== "/history" && location.pathname !== "/myvideos" && /^[a-zA-Z0-9]+$/.test(location.pathname.substring(1));
 
  const isNotFound = location.pathname !== "/watchlater" && location.pathname !== "/likedvideos" && location.pathname !== '/'  && location.pathname !== '/auth' && location.pathname !== "/myvideos"  && location.pathname !=='/history' && !watchPageFound && !location.pathname.startsWith('/channel');

  return (
    <AppProvider>
      <div className='w-screen h-screen overflow-hidden main'>
        <div>
          <AuthUser/>
        </div>
        <div>
          {!isNotFound  && <Header />}
        </div>
        <div className='mt-1 flex'>
          {
         !isNotFound && !watchPageFound && <div className=' h-full w-[264px] px-4 -mt-1 '>
              <LeftSide />
            </div>
          }
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/:id' element={<SteamVideoPage/>} />
            <Route path='/auth' element={<UserSign />} />
            <Route path='/channel/:id' element={<ChannelPage />} />
            <Route path='/upload/video' element={<VideoUploadPage/>} />
            <Route path='/history' element={<GroupHistoryVideo/>}  />
            <Route path='/myvideos' element={<GroupYourVideo/> } />
            <Route path='/likedvideos' element={<GroupLikedVideo/>} />
            <Route path='/watchlater' element={<GroupWatchVideo/>}/>
            <Route path='*' element={<NotFound404 />} />
          </Routes>
        </div>
      </div>
    </AppProvider>
  )
}

export default App