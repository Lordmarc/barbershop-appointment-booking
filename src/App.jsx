import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import AdminPage from './pages/AdminPage'
import BookingPage from './pages/BookingPage'
import PrivateRoute from './components/PrivateRoute'
import LandingPage from './pages/LandingPage'

const App = () => {


  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<LandingPage/>} />
      <Route path='/booking' element={<BookingPage/>} />
      <Route path='/login' element={<LoginPage/>} />
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
