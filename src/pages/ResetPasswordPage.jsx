import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiLock } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { supabase } from "../lib/supabase";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isShow, setIsShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isDone, setIsDone] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      setIsDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isDone) {
    return (
      <div className="min-h-screen bg-[#0f1309] w-full flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm w-full">
          <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
            <span className="text-green-400 text-2xl">✓</span>
          </div>
          <div>
            <p className="text-xl font-bold text-[#f0ede6]">Password Updated!</p>
            <p className="text-gray-500 text-sm mt-1">
              Your password has been successfully changed.
            </p>
          </div>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2.5 bg-[#2a3a1a] border border-[#86c559]/30 text-[#86c559] rounded-xl text-sm font-bold hover:bg-[#86c559]/10 transition-all"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f1309] w-full flex items-center justify-center p-4">
      <div className="flex flex-col max-w-sm w-full gap-6">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#f0ede6]">Reset Password</h2>
          <p className="text-gray-500 text-sm mt-1">Enter your new password below</p>
        </div>

        {/* Form */}
        <div className="bg-[#1a1f14] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4">

          {error && (
            <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-2.5">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
              New Password
            </label>
            <div className="relative flex items-center">
              <CiLock className="text-[#86c559] absolute left-3" size={16} />
              <input
                type={isShow ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full bg-[#1e241a] border border-white/[0.07] rounded-xl px-4 py-2.5 pl-9 pr-10 text-sm text-[#f0ede6] placeholder-gray-600 outline-none focus:border-[#86c559]/50 transition-colors"
              />
              <button
                type="button"
                onClick={() => setIsShow(!isShow)}
                className="absolute right-3 text-gray-500 hover:text-gray-300"
              >
                {isShow ? <FaRegEyeSlash size={16} /> : <FaRegEye size={16} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
              Confirm Password
            </label>
            <div className="relative flex items-center">
              <CiLock className="text-[#86c559] absolute left-3" size={16} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                className="w-full bg-[#1e241a] border border-white/[0.07] rounded-xl px-4 py-2.5 pl-9 text-sm text-[#f0ede6] placeholder-gray-600 outline-none focus:border-[#86c559]/50 transition-colors"
              />
            </div>
          </div>

          <button
            onClick={handleReset}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#86c559] text-black font-bold text-sm hover:bg-[#86c559]/80 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Updating..." : "Update Password"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;