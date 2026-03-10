import Navbar from "../components/Navbar";
import taloy from "../assets/taloy.png"
import AppointmentCard from "../components/AppointmentCard";
import { TbLogout2 } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { MdNavigateNext } from "react-icons/md";
import { useAuthContext } from "../store/AuthContext";
import { getProfile, updateProfile, uploadAvatar } from "../services/profileService";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

const Profile = () => {
    const { user } = useAuthContext();
    const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url ?? taloy);
    const navigate = useNavigate();

    const handleAvatarChange = async(e) => {
      const file = e.target.files[0];
      if(!file) return
      try{
        const newAvatarUrl = await uploadAvatar(user.id, file);
        await updateProfile(user.id, {avatar_url: newAvatarUrl});
        setAvatarUrl(newAvatarUrl)
      }catch(err){
        console.error(err)
      }
    }

    useEffect(() => {
      const fetchProfile = async() => {
        try{
          const profile = await getProfile(user.id);
          setAvatarUrl(profile?.avatar_url ?? user?.user_metadata?.avatar_url);
        }catch(err){
          setAvatarUrl(user?.user_metadata?.avatar_url);
        }
      }
      if(user) fetchProfile();
    }, [user]);

   const handleLogout = async() => {
      await supabase.auth.signOut();
      navigate('/');
    }
  return(
    <div className="w-full flex flex-col max-w-7xl mx-auto min-h-screen">
      <Navbar/>
      <div className="flex flex-col gap-2 p-4 flex-1 h-full">

        <div className="flex flex-col gap-2 text-center items-center justify-center w-full h-72">
          <div className="relative w-40 h-40">
            <div className="w-40 h-40 rounded-full overflow-hidden border-2 border-primary">
             <img src={avatarUrl} alt="" className="w-full h-full rounded-full object-cover" />
            </div>
           <label className="absolute bottom-2 right-2 bg-primary rounded-full p-2 cursor-pointer">
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange}/>
              ✏️
            </label>
          </div>
        
          <div className="flex flex-col gap-2">
            <p className="font-bold text-4xl">{user?.user_metadata?.full_name}</p>
            <span className="text-slate-500">Member since Oct 2023</span>
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <p>MY APPOINTMENTS</p>
          <div>
            <AppointmentCard/>
          </div>
        </div>

        <div className="flex flex-col gap-2 h-full">
          <p className="uppercase text-primary text-xl font-semibold">Account Settings</p>
          <ul>
            <Link className="flex items-center justify-between text-lg text-slate-400">
              <div className="flex items-center gap-2">
                <FaUser className="text-primary"/>
                <span>Edit Profile</span>
              </div>
              <MdNavigateNext size={24}/>
            </Link>
          </ul>
        </div>
        
        <div className='flex items-center gap-1  mt-auto cursor-pointer text-lg text-red-500' onClick={handleLogout}> <TbLogout2/> <span>Logout</span> </div>
      </div>
    </div>
  );
}

export default Profile;