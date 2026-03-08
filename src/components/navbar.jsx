import Logo from '../assets/Logo.jpg';
import { IoIosMenu } from "react-icons/io";

const Navbar = () => {
  return(
    <div className='navbar'>
      <div className='h-16 w-16 rounded-md overflow-hidden'>
        <img src={Logo} alt=""  className='w-full h-full object-cover'/>
      </div>

      <p className='text-xl'>NEGRO BARBERSHOP</p>

      <div className='border h-10 w-10 border-gray-300 rounded-md p-1 shadow-sm shadow-white'>
        <IoIosMenu className='w-full h-full'/>
      </div>
    </div>
  )
}

export default Navbar;