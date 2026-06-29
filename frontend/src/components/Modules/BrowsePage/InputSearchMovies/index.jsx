import React, { useState } from "react";
import { GoSearch, GoX } from "react-icons/go";
import { motion, AnimatePresence } from "framer-motion";
import { useAtom } from "jotai";
import { searchMoviesAtom } from "@/jotai/atoms";

const InputSearchMovies = () => {
  const [isShow, setIsShow] = useState(false);
  const [searchMovies, setSearchMovies] = useAtom(searchMoviesAtom);

  const handleChange = (e) => {
    if (e.target.value.length > 3) {
      setSearchMovies(e.target.value);
    } else {
      setSearchMovies(null);
    }
  };

  const handleClose = () => {
    setIsShow(false);
    setSearchMovies(null);
  };

  return (
    <div className="relative flex items-center">
      <AnimatePresence>
        {isShow && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 240, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative overflow-hidden mr-2"
          >
            <input
              autoFocus
              type="text"
              className="w-full bg-[#18181B] text-[#FAFAFA] text-sm py-2 pl-9 pr-8 rounded-full border border-[#3F3F46] focus:border-[#7C3AED] focus:outline-none placeholder-[#A1A1AA] transition-colors"
              placeholder="Search movies, genres..."
              onChange={handleChange}
            />
            <GoSearch
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A1A1AA]"
            />
            {searchMovies && (
              <button
                onClick={handleClose}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A1AA] hover:text-[#FAFAFA]"
              >
                <GoX size={14} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!isShow && (
        <button
          onClick={() => setIsShow(true)}
          className="p-2 text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B] rounded-full transition-colors cursor-pointer"
          title="Search"
        >
          <GoSearch size={20} />
        </button>
      )}
    </div>
  );
};

export default InputSearchMovies;

