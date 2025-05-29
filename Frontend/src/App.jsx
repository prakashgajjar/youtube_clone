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
import GropuSearchVideos from './components/Search/GropuSearchVideos'
import SubscriptionVideoGroup from './components/Subscriptions/SubscriptionVideoGroup'
import GroupShorts from './components/Shorts/GroupShorts'
import ChannelHome from './components/channelSubPages/ChannelHome'
import ChannelVideos from './components/channelSubPages/ChannelVideos'
import ChannelShorts from './components/channelSubPages/ChannelShorts'

const App = () => {
  const location = useLocation();
  const videoRunnigPage = /^\/video\/[a-zA-Z0-9]+$/.test(location.pathname);
  const uploadVideo = location.pathname == '/upload/video'

  return (
    <AppProvider>
      <div className='w-screen h-screen overflow-hidden main'>
        <div>
          <AuthUser />
        </div>
        <div>
          {!uploadVideo && <Header />}
        </div>

        <div className='mt-1 flex'>
          {!videoRunnigPage && !uploadVideo &&
            <div className=' h-full w-[264px] px-4 -mt-1 '>
              <LeftSide />
            </div>
          }
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/video/:id' element={<SteamVideoPage />} />
            <Route path='/auth' element={<UserSign />} />
            <Route path="/channel/:id" element={<ChannelPage />}>
              <Route path='' element={<ChannelHome />} />
              <Route path="videos" element={<ChannelVideos />} />
              <Route path="shorts" element={<ChannelShorts />} />
            </Route>

            <Route path='/upload/video' element={<VideoUploadPage />} />
            <Route path='/my/history' element={<GroupHistoryVideo />} />
            <Route path='/my/myvideos' element={<GroupYourVideo />} />
            <Route path='/my/likedvideos' element={<GroupLikedVideo />} />
            <Route path='/my/watchlater' element={<GroupWatchVideo />} />
            <Route path='/results/search' element={<GropuSearchVideos />} />
            <Route path='/feed/subscriptions' element={<SubscriptionVideoGroup />} />
            <Route path='/shorts/:id' element={<GroupShorts />} />
            <Route path='*' element={<NotFound404 />} />
          </Routes>
        </div>
      </div>
    </AppProvider>
  )
}

export default App