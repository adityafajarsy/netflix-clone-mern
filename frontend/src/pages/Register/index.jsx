import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { JUMBOTRON_IMAGE } from "@/constants/listAsset";
import { useAtom } from "jotai";
import { emailAtom } from "@/jotai/atoms";
import { auth } from "@/utils/firebase";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { axiosInstanceExpress } from "@/utils/axios";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }
    try {
      setIsLoading(true);
      const register = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (register) {
        await signOut(auth);
        const addUser = await axiosInstanceExpress.post("sign-up", {
          email,
          password,
        });
        if (addUser.status === 201) {
          toast.success("Account registered successfully!");
          setTimeout(() => {
            setIsLoading(false);
            navigate("/login");
          }, 1500);
        }
      }
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090B] relative">
      <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="relative min-h-screen w-full bg-[#09090B] flex items-center justify-center p-4 overflow-hidden select-none">
        {/* Ambient Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-25 scale-105 blur-sm transition-all duration-1000"
            src={JUMBOTRON_IMAGE}
            alt="Velix Background"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/80 to-[#09090B]/60" />
          <div className="absolute bottom-1/4 right-1/2 translate-x-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/15 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* Top Header Bar */}
        <div className="absolute top-6 left-6 sm:left-12 z-20 flex items-center gap-3">
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#7C3AED]/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-xl tracking-tighter">V</span>
            </div>
            <span className="text-2xl font-black tracking-widest text-[#FAFAFA] font-sans group-hover:text-white transition-colors">
              VELIX
            </span>
          </div>
        </div>

        {/* Auth Card Container */}
        <div className="relative z-10 w-full max-w-md bg-[#18181B]/85 backdrop-blur-2xl border border-[#3F3F46]/70 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/80 my-16">
          <div className="flex items-center justify-end mb-6">
            <span className="text-xs font-semibold text-[#8B5CF6] bg-[#8B5CF6]/10 px-2.5 py-1 rounded-lg border border-[#8B5CF6]/30">
              Create Account
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#FAFAFA] tracking-tight font-sans">
              Join Velix today
            </h2>
            <p className="text-sm text-[#A1A1AA] mt-1.5">
              Create your account to start streaming premium movies and TV shows.
            </p>
          </div>

          <form onSubmit={handleRegister} className="flex flex-col gap-5">
            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#A1A1AA]">Email Address</label>
              <div className="relative flex items-center">
                <FiMail className="absolute left-4 text-[#A1A1AA]" size={18} />
                <input
                  placeholder="name@example.com"
                  type="email"
                  value={email ? email : ""}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 bg-[#09090B]/90 text-[#FAFAFA] placeholder-[#A1A1AA]/50 rounded-xl border border-[#3F3F46]/70 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] text-sm outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-[#A1A1AA]">Create Password</label>
              <div className="relative flex items-center">
                <FiLock className="absolute left-4 text-[#A1A1AA]" size={18} />
                <input
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3.5 bg-[#09090B]/90 text-[#FAFAFA] placeholder-[#A1A1AA]/50 rounded-xl border border-[#3F3F46]/70 focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] text-sm outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-2 py-3.5 w-full bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#7C3AED]/25 transition-all duration-300 active:scale-[0.98] disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <>
                  <span>Create Free Account</span>
                  <FiUserPlus size={16} />
                </>
              )}
            </button>

            {/* Login Link */}
            <div className="mt-4 pt-4 border-t border-[#3F3F46]/40 text-center text-xs text-[#A1A1AA]">
              Already have an account?{" "}
              <span
                onClick={() => navigate("/login")}
                className="text-[#8B5CF6] font-semibold hover:underline cursor-pointer ml-1"
              >
                Sign In Here
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

