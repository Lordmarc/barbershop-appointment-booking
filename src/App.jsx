import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import BookingPage from './pages/BookingPage'
import PrivateRoute from './components/PrivateRoute'
import LandingPage from './pages/LandingPage'
import Profile from './pages/Profile'

const App = () => {


  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/booking' element={<BookingPage/>} />
      <Route path='/login' element={<LoginPage/>} />
      <Route element={<PrivateRoute/>}>
        <Route path="/admin" element={<AdminPage/>} />
        <Route path='/profile' element={<Profile/>}/>
      </Route>
      
    </Routes>
   </BrowserRouter>
  )
}

export default App
