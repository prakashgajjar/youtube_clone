import React from 'react'
import './App.css'
import HomePage from './components/Pages/HomePage'
import UserSign from './components/components/UserSign'
import { AppProvider } from './Hooks/AppContext'
import { Route  , Routes } from 'react-router-dom'

const App = () => {
  return (
    <AppProvider>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/auth' element={<UserSign/>} />
        </Routes>    
    </AppProvider>
  )
}

export default App