import React, { useState } from "react";
import { GoChevronLeft } from "react-icons/go";
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { JUMBOTRON_IMAGE } from "@/constants/listAsset";
import { useAtom } from "jotai";
import { emailAtom, emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { toast, ToastContainer } from "react-toastify";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import { axiosInstanceExpress } from "@/utils/axios";

const Login = () => {
  const navigate = useNavigate();

  const [, setToken] = useAtom(tokenAtom);
  const [, setEmailStorage] = useAtom(emailStorageAtom);

  const [email, setEmail] = useAtom(emailAtom);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return toast.error("Please fill in all fields");
    }
    try {
      setIsLoading(true);
      const login = await signInWithEmailAndPassword(auth, email, password);
      const firebaseToken = await getIdToken(login.user);

      const addToken = await axiosInstanceExpress.post("my-token", {
        email,
        password,
        token: firebaseToken,
      });

      if (addToken.status !== 200)
        return toast.error("Cannot sign in now, try again later");

      setToken(firebaseToken);
      setEmailStorage(login.user.email);

      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        setIsLoading(false);
        navigate("/browse");
      }, 1500);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message || error.code);
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
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#7C3AED]/15 rounded-full blur-[120px] pointer-events-none" />
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
            <span className="text-xs font-semibold text-[#7C3AED] bg-[#7C3AED]/10 px-2.5 py-1 rounded-lg border border-[#7C3AED]/30">
              Member Access
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-[#FAFAFA] tracking-tight font-sans">
              Welcome back
            </h2>
            <p className="text-sm text-[#A1A1AA] mt-1.5">
              Enter your credentials to access your Velix streaming library.
            </p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
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
              <label className="text-xs font-semibold text-[#A1A1AA]">Password</label>
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
                  <span>Authenticating...</span>
                </div>
              ) : (
                <>
                  <span>Sign In</span>
                  <FiArrowRight size={16} />
                </>
              )}
            </button>

            {/* Register Link */}
            <div className="mt-4 pt-4 border-t border-[#3F3F46]/40 text-center text-xs text-[#A1A1AA]">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-[#8B5CF6] font-semibold hover:underline cursor-pointer ml-1"
              >
                Sign Up Now
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

