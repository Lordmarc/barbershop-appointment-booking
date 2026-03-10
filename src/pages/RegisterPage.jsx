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


const RegisterPage = () => {
  const [ formData, setFormData ] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });
  const [isShow, setIsShow] = useState(false);

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
      await registerAccount(formData.email,formData.password, formData.fullName,  formData.phoneNumber, );
      navigate('/');
    }catch(err){
      console.error(err.message)
    }


  }
  
  return(
    <div className="w-full flex flex-col min-h-screen max-w-7xl mx-auto ">
      <div className="flex flex-col p-4 flex-1">
        <div className="flex items-center justify-center" onClick={() => navigate(-1)}>
          <GrLinkPrevious className="absolute left-2"/>
          <p>Create Account</p>
        </div>

        {/* Registration input fields */}

        <div className="flex flex-col gap-4 flex-1 h-full">
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

            

          <div className="w-full  p-4 bg-primary rounded-lg text-neutral-dark font-semibold text-2xl flex items-center justify-center mt-auto" onClick={handleRegister}>
              <button>Sign Up</button>
            </div>
        </div>

        

      </div>
          
    </div>
  );
}

export default RegisterPage;