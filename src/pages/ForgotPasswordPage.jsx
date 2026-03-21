import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineMail } from "react-icons/md";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) throw error;
      setIsSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isSent) {
    return (
      <div className="min-h-screen bg-[#0f1309] w-full flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-sm w-full">
          <div className="w-16 h-16 rounded-full bg-green-400/10 border border-green-400/30 flex items-center justify-center">
            <span className="text-green-400 text-2xl">✓</span>
          </div>
          <div>
            <p className="text-xl font-bold text-[#f0ede6]">Check your email!</p>
            <p className="text-gray-500 text-sm mt-1">
              We sent a password reset link to{" "}
              <span className="text-[#86c559]">{email}</span>
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
    <div className="min-h-screen bg-[#0f1309] w-full flex items-center justify-center p-4 pt-16">
      <Navbar />
      <div className="flex flex-col max-w-sm w-full gap-6">

        {/* Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#f0ede6]">Forgot Password</h2>
          <p className="text-gray-500 text-sm mt-1">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {/* Form */}
        <div className="bg-[#1a1f14] border border-white/[0.07] rounded-2xl p-6 flex flex-col gap-4">

          {error && (
            <div className="bg-red-500/10 border border-red-400/30 rounded-xl px-4 py-2.5">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] font-bold tracking-widest uppercase text-gray-500">
              Email Address
            </label>
            <div className="relative flex items-center">
              <MdOutlineMail className="text-[#86c559] absolute left-3" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#1e241a] border border-white/[0.07] rounded-xl px-4 py-2.5 pl-9 text-sm text-[#f0ede6] placeholder-gray-600 outline-none focus:border-[#86c559]/50 transition-colors"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-[#86c559] text-black font-bold text-sm hover:bg-[#86c559]/80 transition-all disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.07] text-sm text-gray-400 font-semibold hover:bg-white/[0.08] transition-all cursor-pointer"
          >
            Back to Login
          </button>

        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;