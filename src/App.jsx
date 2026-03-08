import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import BookingPage from './pages/BookingPage'
import PrivateRoute from './components/PrivateRoute'

const App = () => {


  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<BookingPage/>} />
      <Route  path='/login' element={<LoginPage/>} />
      <Route path='/admin' 
        element={
          <PrivateRoute>
            <AdminPage/>
          </PrivateRoute>
        }/>
    </Routes>
   </BrowserRouter>
  )
}

export default App
