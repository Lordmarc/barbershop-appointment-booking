import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { MdOutlineMail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { loginWithGoogle, loginWithFacebook } from '../services/authService';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

import Logo from "../assets/Logo.jpg"

const LoginPage = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword] = useState("");
  const [ error, setError ] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsShow(!isShow)
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
    } else {
      navigate('/admin')
    }
  } 

  return(
    <div className="min-h-screen w-full flex items-center justify-center">
      <div>

      {/* Barbershop logo container */}
        <div className=" w-full flex flex-col items-center justify-center gap-4 text-center">

          <div
            className="absolute inset-0 z-0 pointer-events-none"
            style={{
              backgroundImage: `
                radial-gradient(circle at 50% 50%, 
                  rgba(245, 158, 11, 0.14) 0%, 
                  rgba(245, 158, 11, 0.08) 25%, 
                  rgba(245, 158, 11, 0.03) 35%, 
                  transparent 50%
                )
              `,
              backgroundSize: "100% 100%",
            }}
          />
           <div className="rounded-full h-36 w-36 overflow-hidden p-6 border-2 border-neutral-border">
          <img src={Logo} alt="Negro barbershop logo" className="h-full w-full rounded-full border-2 border-primary"/>
        </div>
        <div className="flex flex-col justify-center items-center">
           <h1 className="text-4xl font-semibold">Gentleman's Entrance</h1>
           <p className="text-slate-400 max-w-72 ">Step into the chair, we've been waiting for you.</p>
          </div>
        
   
          </div>
          
          { /*Input fields*/ }
          <div className="flex flex-col gap-4">
            <div className="text-slate-400 flex flex-col">
              <label htmlFor="" className="uppercase mb-2 font-semibold text-white/70">Email Address</label>
              <div className="flex items-center w-full text-xl">
                 <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}  className="w-full bg-transparent pl-8 p-2 border-2 border-neutral-border rounded-md"/>
                 <MdOutlineMail className="absolute left-6"/>
              </div>
           
            </div>

            <div className="text-slate-400 flex flex-col">
              <label htmlFor="" className="uppercase mb-2 font-semibold text-white/70">Password</label>
              <div className="flex items-center w-full text-xl">
                 <input type={isShow ? 'text' : 'password'} placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-transparent pl-8 p-2 border-2 border-neutral-border rounded-md"/>
                 <CiLock className="absolute left-6"/>
                 <div className="absolute right-7" onClick={handleToggle}>
                    {isShow ? <FaRegEyeSlash/> : <FaRegEye/>  }
                 </div>
               
              </div>
           
            </div>

            <div className="flex w-full items-center justify-center bg-primary text-neutral-dark font-semibold text-2xl rounded-lg shadow-primary shadow p-4">
              <button>Login to my Account</button>
            </div>

            <div className="flex items-center gap-4 py-4">
              <div className="h-px bg-slate-200 dark:bg-primary/10 flex-1"></div>
              <span className="text-slate-400 text-xs font-bold uppercase">Or continue with</span>
              <div className="h-px bg-slate-200 dark:bg-primary/10 flex-1"></div>
            </div>

            <button
              onClick={loginWithGoogle}
              className="flex items-center gap-3 border border-neutral-border rounded-lg px-6 py-3 hover:bg-neutral-dark transition-all"
            >
              <FcGoogle className="text-2xl"/>
              <span>Continue with Google</span>
            </button>

            <button
              onClick={loginWithFacebook}
              className="flex items-center gap-3 border border-neutral-border rounded-lg px-6 py-3 hover:bg-neutral-dark transition-all"
              >
              <FaFacebook className="text-2xl text-blue-500"/>
              <span>Continue with Facebook</span>
          </button>
          </div>
      </div>
      
    </div>
  )
}


export default LoginPage;