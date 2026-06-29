import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { axiosInstanceExpress } from "@/utils/axios";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { useAtom } from "jotai";
import React from "react";
import { useNavigate } from "react-router-dom";
import { GoPerson, GoSignOut } from "react-icons/go";

const AccountMenu = () => {
  const navigate = useNavigate();
  const [token, setIsToken] = useAtom(tokenAtom);
  const [email, setEmailStorage] = useAtom(emailStorageAtom);

  const handleSignOut = async () => {
    try {
      const data = { email, token };
      const dbSignOut = await axiosInstanceExpress.delete("my-token", {
        data,
      });

      if (dbSignOut.status === 204) {
        signOut(auth).then(() => {
          setIsToken(null);
          setEmailStorage(null);
          navigate("/");
        });
      }
    } catch (err) {
      // Fallback signout if token deletion fails
      signOut(auth).then(() => {
        setIsToken(null);
        setEmailStorage(null);
        navigate("/");
      });
    }
  };

  if (!email && !token) {
    return (
      <button
        onClick={() => navigate("/login")}
        className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 cursor-pointer shadow-sm active:scale-95"
      >
        Sign In
      </button>
    );
  }

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 focus:outline-none cursor-pointer">
        <div className="w-9 h-9 rounded-full bg-[#27272A] border border-[#3F3F46] flex items-center justify-center text-[#FAFAFA] font-semibold hover:border-[#7C3AED] transition-colors overflow-hidden">
          <GoPerson size={18} />
        </div>
      </button>
      
      <div className="absolute right-0 top-11 hidden group-hover:flex flex-col gap-3 p-4 w-56 bg-[#18181B] border border-[#3F3F46] rounded-xl shadow-2xl z-50 transition-all duration-200">
        <div className="border-b border-[#3F3F46] pb-2">
          <p className="text-xs text-[#A1A1AA] uppercase font-semibold tracking-wider">Account</p>
          <p className="text-sm font-medium text-[#FAFAFA] truncate mt-0.5">{email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm text-[#A1A1AA] hover:text-[#EF4444] transition-colors cursor-pointer w-full text-left py-1"
        >
          <GoSignOut size={16} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default AccountMenu;

