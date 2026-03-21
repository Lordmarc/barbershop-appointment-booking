import { GrLinkPrevious } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { MdContactPhone } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import CustomInput from "../components/CustomInput";
import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { registerAccount } from "../services/authService";
import Navbar from "../components/Navbar";


const RegisterPage = () => {
  const [ formData, setFormData ] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    role: 'customer'
  });
  const [isShow, setIsShow] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false)

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name,value } = e.target;

    setFormData((prev) => ({
      ...prev, [name]: value
    }))
  }

  const handleRegister = async(e) => {
    e.preventDefault();
    console.log(formData)
    if(formData.password !== formData.confirmPassword){
      alert("Password does not match!");
      return;
    }

    if(!formData.fullName || !formData.email || !formData.phoneNumber || !formData.password || !formData.confirmPassword){
      alert("Fill all fields");
      return;
    }

    try{
      await registerAccount(formData.email,formData.password, formData.fullName,  formData.phoneNumber, formData.role );
      setIsRegistered(true);
    }catch(err){
      console.error(err.message)
    }


  }
if (isRegistered) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0f1309]">
      <div className="flex flex-col items-center gap-4 p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
          <span className="text-green-400 text-2xl">✓</span>
        </div>
        <div>
          <p className="text-xl font-bold text-[#f0ede6]">Check your email!</p>
          <p className="text-gray-500 text-sm mt-1">
            We sent a confirmation link to <span className="text-[#86c559]">{formData.email}</span>
          </p>
        </div>
        <button
          onClick={() => navigate('/login')}
          className="px-6 py-2.5 bg-[#2a3a1a] border border-[#86c559]/30 text-[#86c559] rounded-xl text-sm font-bold hover:bg-[#86c559]/10 transition-all"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
  return(
    <div className="min-h-screen w-full flex items-center justify-center">
      <Navbar />
      <div className="flex flex-col max-w-md relative h-full w-full p-4 pt-16 md:pt-20">
        <div className="flex items-center  justify-center text-3xl my-4 text-[#86c559]">
          <h2>Create your account</h2>
        </div>
 
        {/* Registration input fields */}

        <div className="flex flex-col gap-4 flex-1 h-full  p-4">
          <CustomInput
            label="Full Name"
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Ex. John Doe"
            icon={FaUser}

            />


          <CustomInput
            label="Email Address"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            icon={MdOutlineMail}

            />

          <CustomInput
            label="Phone Number"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="(+63) 91234567890"
            icon={MdContactPhone}

            />

          <CustomInput
            label="Password"
            type={isShow ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            rightElement={
              <div onClick={() => setIsShow(!isShow)}>{isShow ? <FaRegEyeSlash size={20}/> : <FaRegEye size={20}/>}</div>
            }
            icon={CiLock}

            />

          <CustomInput
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            icon={CiLock}

            />

            

          <div className="w-full bg-[#86c559] rounded-lg  hover:bg-[#86c559]/50 font-semibold shadow shadow-[#86c559] text-2xl flex items-center justify-center mt-auto" onClick={handleRegister}>
              <button className="p-3">Sign Up</button>
            </div>
        </div>

        

      </div>
      
    </div>
  );
}

export default RegisterPage;