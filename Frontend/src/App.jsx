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

const App = () => {
  const location = useLocation();
  const watchPageFound = /^[a-zA-Z0-9]+$/.test(location.pathname.substring(1));
  const isNotFound = location.pathname !== '/'  && location.pathname !== '/auth' && !watchPageFound && !location.pathname.startsWith('/channel');

  return (
    <AppProvider>
      <div className='w-screen h-screen overflow-hidden '>
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
            <Route path='*' element={<NotFound404 />} />
          </Routes>
        </div>
      </div>
    </AppProvider>
  )
}

export default App