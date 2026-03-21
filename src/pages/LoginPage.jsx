import { useState } from "react";
import { CiLock } from "react-icons/ci";
import { FaFacebook, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineMail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import {
  loginWithEmail,
  loginWithFacebook,
  loginWithGoogle,
} from "../services/authService";

import Logo from "../assets/Logo.jpg";
import Navbar from "../components/Navbar";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsShow(!isShow);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Fill all fields");
      return;
    }

    try {
      await loginWithEmail(email, password);

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", (await supabase.auth.getUser()).data.user.id)
        .single();

      if (profile?.role === "admin") navigate("/admin");
      else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <Navbar />
      <div className="flex flex-col max-w-md relative h-full w-full p-4 pt-16 md:pt-20">
        {/* Barbershop logo container */}
        <div className=" w-full flex flex-col items-center justify-center gap-4 text-center relative ">
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
            <img
              src={Logo}
              alt="Negro barbershop logo"
              className="h-full w-full rounded-full border-2 border-primary"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-2xl md:text-4xl font-semibold">
              Gentleman's Entrance
            </h1>
            <p className="text-slate-400 max-w-72 text-sm md:text-base">
              Step into the chair, we've been waiting for you.
            </p>
          </div>
        </div>

        {/*Input fields*/}
        <div className="flex flex-col gap-4">
          <div className="text-slate-400 flex flex-col">
            <label
              htmlFor=""
              className="uppercase mb-2 font-semibold text-white/70"
            >
              Email Address
            </label>
            <div className="flex items-center w-full text-xl">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent pl-8 p-2 border-2 border-neutral-border rounded-md"
              />
              <MdOutlineMail className="absolute left-6" />
            </div>
          </div>

          <div className="text-slate-400 flex flex-col">
            <label
              htmlFor=""
              className="uppercase mb-2 font-semibold text-white/70"
            >
              Password
            </label>
            <div className="flex items-center w-full text-xl">
              <input
                type={isShow ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent pl-8 p-2 border-2 border-neutral-border rounded-md"
              />
              <CiLock className="absolute left-6" />
              <div className="absolute right-7" onClick={handleToggle}>
                {isShow ? <FaRegEyeSlash /> : <FaRegEye />}
              </div>
            </div>
          </div>

          <div
            className="flex w-full items-center justify-center  bg-[#86c559] text-[#f0ede6] font-semibold text-2xl rounded-lg  shadow shadow-[#86c559] hover:bg-[#86c559]/50"
            onClick={handleLogin}
          >
            <button className="p-3 w-full h-full">Login to my Account</button>
          </div>

          <div className="flex items-center gap-4 py-4">
            <div className="h-px bg-slate-200 dark:bg-primary/10 flex-1"></div>
            <span className="text-slate-400 text-xs font-bold uppercase">
              Or continue with
            </span>
            <div className="h-px bg-slate-200 dark:bg-primary/10 flex-1"></div>
          </div>

          <div className="flex   items-center justify-center gap-4">
            <button
              onClick={loginWithGoogle}
              className="flex items-center justify-center gap-3 border border-white/10  bg-[#1a1f14] rounded-full h-14 w-14  hover:bg-white/[0.1] transition-all"
            >
              <FcGoogle className="text-2xl" />
            </button>

            <button
              onClick={loginWithFacebook}
              className="flex items-center justify-center gap-3 border border-white/10  bg-[#1a1f14] rounded-full h-14 w-14  hover:bg-white/[0.1] transition-all"
            >
              <FaFacebook className="text-2xl text-blue-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
