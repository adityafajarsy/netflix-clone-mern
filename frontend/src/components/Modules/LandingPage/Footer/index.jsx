import React from "react";
import { useNavigate } from "react-router-dom";
import { FaGithub, FaTwitter, FaInstagram, FaDiscord, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="w-full bg-[#09090B] text-[#A1A1AA] border-t border-[#3F3F46]/50 relative overflow-hidden select-none">
      {/* Ambient Halo Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-[#7C3AED]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand Column (Spans 2 cols on LG) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div
              onClick={() => navigate("/browse")}
              className="cursor-pointer flex items-center gap-2.5 group select-none w-fit"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center shadow-lg shadow-[#7C3AED]/35 group-hover:scale-105 transition-transform">
                <span className="text-white font-black text-xl tracking-tighter">V</span>
              </div>
              <span className="text-2xl font-black tracking-widest text-[#FAFAFA] font-sans group-hover:text-white transition-colors">
                VELIX
              </span>
            </div>

            <p className="text-sm text-[#A1A1AA] leading-relaxed max-w-sm font-normal">
              Stories that stay. Experience modern cinematic streaming with high-definition curated collections, TV series, and personalized favorites.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {[
                { icon: <FaTwitter size={16} />, href: "https://twitter.com", title: "Twitter" },
                { icon: <FaInstagram size={16} />, href: "https://instagram.com", title: "Instagram" },
                { icon: <FaGithub size={16} />, href: "https://github.com", title: "GitHub" },
                { icon: <FaDiscord size={16} />, href: "https://discord.com", title: "Discord" },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-xl bg-[#18181B] border border-[#3F3F46]/60 text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#27272A] hover:border-[#7C3AED]/50 flex items-center justify-center transition-all shadow-md"
                  title={social.title}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FAFAFA]">Navigation</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <button onClick={() => navigate("/browse")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">Home</button>
              </li>
              <li>
                <button onClick={() => navigate("/browse")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">Movies</button>
              </li>
              <li>
                <button onClick={() => navigate("/tv-series")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">TV Series</button>
              </li>
              <li>
                <button onClick={() => navigate("/genres")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">Genres</button>
              </li>
              <li>
                <button onClick={() => navigate("/favorite")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">Favorites</button>
              </li>
            </ul>
          </div>

          {/* Top Genres */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FAFAFA]">Genres</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <button onClick={() => navigate("/genre/28?name=Action")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">Action</button>
              </li>
              <li>
                <button onClick={() => navigate("/genre/878?name=Science%20Fiction")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">Sci-Fi</button>
              </li>
              <li>
                <button onClick={() => navigate("/genre/53?name=Thriller")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">Thriller</button>
              </li>
              <li>
                <button onClick={() => navigate("/genre/35?name=Comedy")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">Comedy</button>
              </li>
              <li>
                <button onClick={() => navigate("/genre/18?name=Drama")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">Drama</button>
              </li>
            </ul>
          </div>

          {/* Legal / Account */}
          <div className="flex flex-col gap-3.5">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#FAFAFA]">Account & Legal</h4>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <button onClick={() => navigate("/login")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">Sign In</button>
              </li>
              <li>
                <button onClick={() => navigate("/register")} className="hover:text-[#8B5CF6] transition-colors cursor-pointer">Sign Up</button>
              </li>
              <li>
                <span className="hover:text-[#FAFAFA] transition-colors cursor-pointer opacity-80">Privacy Policy</span>
              </li>
              <li>
                <span className="hover:text-[#FAFAFA] transition-colors cursor-pointer opacity-80">Terms of Service</span>
              </li>
              <li>
                <span className="hover:text-[#FAFAFA] transition-colors cursor-pointer opacity-80">Cookie Preferences</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#3F3F46]/60 to-transparent my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#71717A]">
          <p>© 2026 VELIX Inc. All rights reserved.</p>
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <FaHeart className="text-red-500 fill-current" size={12} />
            <span>for cinema lovers.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
