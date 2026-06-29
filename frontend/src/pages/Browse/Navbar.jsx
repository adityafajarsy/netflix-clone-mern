import InputSearchMovies from "@mods/BrowsePage/InputSearchMovies";
import { LIST_NAVBAR } from "@/constants/ListNavbar";
import EachUtils from "@/utils/EachUtils";
import React, { useState, useEffect } from "react";
import AccountMenu from "@/components/Modules/BrowsePage/AccountMenu";
import { useNavigate, useLocation } from "react-router-dom";
import { GoHome, GoVideo, GoTag, GoZap, GoHeart, GoX, GoChevronDown, GoChevronUp } from "react-icons/go";
import { FiTv, FiUser, FiLogIn, FiUserPlus, FiLogOut } from "react-icons/fi";
import { useAtom } from "jotai";
import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { auth } from "@/utils/firebase";
import { signOut } from "firebase/auth";
import { axiosInstanceExpress } from "@/utils/axios";
import { motion, AnimatePresence } from "framer-motion";

const getNavIcon = (iconName) => {
  switch (iconName) {
    case "home":
      return <GoHome size={18} />;
    case "movies":
      return <GoVideo size={18} />;
    case "tv":
      return <FiTv size={18} />;
    case "genres":
      return <GoTag size={18} />;
    case "trending":
      return <GoZap size={18} className="text-yellow-400 fill-yellow-400 animate-pulse" />;
    case "favorites":
      return <GoHeart size={18} />;
    default:
      return null;
  }
};

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [token, setIsToken] = useAtom(tokenAtom);
  const [email, setEmailStorage] = useAtom(emailStorageAtom);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleSignOut = async () => {
    try {
      const data = { email, token };
      const dbSignOut = await axiosInstanceExpress.delete("my-token", { data });
      if (dbSignOut.status === 204) {
        signOut(auth).then(() => {
          setIsToken(null);
          setEmailStorage(null);
          navigate("/");
        });
      }
    } catch (err) {
      signOut(auth).then(() => {
        setIsToken(null);
        setEmailStorage(null);
        navigate("/");
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[9999] transition-all duration-300 ${
        isScrolled
          ? "md:bg-[#09090B]/95 md:backdrop-blur-xl md:border-b md:border-[#3F3F46]/70 md:shadow-2xl py-2 md:py-3"
          : "bg-gradient-to-b from-[#09090B] via-[#09090B]/80 to-transparent py-2 md:py-4"
      }`}
    >
      {/* DESKTOP HEADER */}
      <div className="hidden md:flex max-w-7xl mx-auto px-6 lg:px-12 justify-between items-center">
        <div className="flex items-center gap-8 lg:gap-10">
          <div
            onClick={() => navigate("/browse")}
            className="cursor-pointer flex items-center gap-2 group select-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#7C3AED]/30 group-hover:scale-105 transition-transform">
              <span className="text-white font-black text-lg tracking-tighter">V</span>
            </div>
            <span className="text-2xl font-black tracking-widest text-[#FAFAFA] font-sans group-hover:text-white transition-colors">
              VELIX
            </span>
          </div>

          <ul className="flex items-center gap-1.5 lg:gap-2">
            <EachUtils
              of={LIST_NAVBAR}
              render={(item, index) => {
                const isActive = location.pathname === item.url && (item.title === "Home" || item.title === "Movies");
                if (item.isSpecial) {
                  return (
                    <li key={index}>
                      <a
                        href={item.url}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 bg-[#7C3AED]/15 text-[#FAFAFA] border border-[#7C3AED]/40 hover:bg-[#7C3AED]/30 transition-all shadow-sm shadow-[#7C3AED]/20 cursor-pointer"
                      >
                        {getNavIcon(item.icon)}
                        <span>{item.title}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                      </a>
                    </li>
                  );
                }

                return (
                  <li key={index}>
                    <a
                      href={item.url}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                        isActive
                          ? "text-[#FAFAFA] bg-[#18181B] font-semibold border border-[#3F3F46]/60 shadow-sm"
                          : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]/60"
                      }`}
                    >
                      {getNavIcon(item.icon)}
                      <span>{item.title}</span>
                    </a>
                  </li>
                );
              }}
            />
          </ul>
        </div>

        <div className="flex items-center gap-4">
          <InputSearchMovies />
          <AccountMenu />
        </div>
      </div>

      {/* MOBILE CAPSULE HEADER (WITH SCROLL TRANSITION MATCHING REFERENCE IMAGES) */}
      <div className="md:hidden transition-all duration-300">
        <div
          className={`transition-all duration-300 flex items-center justify-between ${
            isScrolled
              ? "mx-3 mt-2 bg-[#09090B]/95 backdrop-blur-xl border border-[#3F3F46]/80 rounded-full px-4 py-2.5 shadow-2xl"
              : "w-full px-5 py-3 bg-transparent border-transparent rounded-none shadow-none"
          }`}
        >
          {/* Brand Logo */}
          <div
            onClick={() => navigate("/browse")}
            className="cursor-pointer flex items-center gap-1.5 group select-none"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center shadow-md shadow-[#7C3AED]/30">
              <span className="text-white font-black text-xs tracking-tighter">V</span>
            </div>
            <span className="text-lg font-black tracking-widest text-[#FAFAFA] font-sans">
              VELIX
            </span>
          </div>

          {/* Right Controls Capsule */}
          <div className="flex items-center gap-2">
            <InputSearchMovies />

            {/* Profile & Dropdown Trigger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center gap-1.5 pl-1 pr-0.5 py-0.5 rounded-full hover:bg-[#18181B] transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-full bg-[#27272A] border border-[#3F3F46] flex items-center justify-center text-[#FAFAFA]">
                <FiUser size={14} />
              </div>
              <span className="text-[#A1A1AA] hover:text-[#FAFAFA]">
                {isMobileMenuOpen ? <GoChevronUp size={14} /> : <GoChevronDown size={14} />}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Collapse Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden max-w-md mx-auto px-3 pt-2.5 pb-4 select-none"
          >
            <div className="bg-[#18181B] border border-[#3F3F46] rounded-2xl p-4 shadow-2xl flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
              {/* Top Account Box */}
              <div className="bg-[#09090B] border border-[#3F3F46]/60 rounded-xl p-3.5 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#27272A] border border-[#3F3F46] flex items-center justify-center text-[#FAFAFA]">
                    <FiUser size={20} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#FAFAFA]">Account</span>
                    <span className="text-xs text-[#A1A1AA] truncate max-w-[200px]">
                      {email ? email : "Sign in to save your list."}
                    </span>
                  </div>
                </div>

                {email ? (
                  <button
                    onClick={handleSignOut}
                    className="w-full py-2 bg-[#27272A] hover:bg-[#3F3F46] text-[#EF4444] text-xs font-semibold rounded-lg border border-[#3F3F46] flex items-center justify-center gap-2 transition-colors cursor-pointer mt-1"
                  >
                    <FiLogOut size={14} />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      onClick={() => navigate("/login")}
                      className="py-2.5 bg-[#27272A] hover:bg-[#3F3F46] text-white text-xs font-semibold rounded-lg border border-[#3F3F46] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FiLogIn size={14} />
                      <span>Sign In</span>
                    </button>
                    <button
                      onClick={() => navigate("/register")}
                      className="py-2.5 bg-[#7C3AED] hover:bg-[#8B5CF6] text-white text-xs font-semibold rounded-lg shadow-md flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <FiUserPlus size={14} />
                      <span>Sign Up</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="border-b border-[#3F3F46]/60" />

              {/* Navigation Items List */}
              <div className="flex flex-col gap-1.5">
                <EachUtils
                  of={LIST_NAVBAR}
                  render={(item, index) => {
                    const isActive = location.pathname === item.url && (item.title === "Home" || item.title === "Movies");
                    
                    if (item.isSpecial) {
                      return (
                        <a
                          key={index}
                          href={item.url}
                          className="px-4 py-3 rounded-xl text-sm font-semibold flex items-center justify-between bg-[#7C3AED]/15 text-[#FAFAFA] border border-[#7C3AED]/40 hover:bg-[#7C3AED]/30 transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            {getNavIcon(item.icon)}
                            <span>{item.title}</span>
                          </div>
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        </a>
                      );
                    }

                    return (
                      <a
                        key={index}
                        href={item.url}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all flex items-center gap-3 ${
                          isActive
                            ? "text-[#FAFAFA] bg-[#27272A] font-semibold border border-[#3F3F46]"
                            : "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A]/60"
                        }`}
                      >
                        {getNavIcon(item.icon)}
                        <span>{item.title}</span>
                      </a>
                    );
                  }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;





