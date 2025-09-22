import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { searchMoviesAtom } from "@/jotai/atoms";

const InputSearchMovies = () => {
  const [isShow, setIsShow] = useState(false);
  const [, setSearchMovies] = useAtom(searchMoviesAtom)

  const handleChange = (e) => {
    if(e.target.value.length > 3) {
      setSearchMovies(e.target.value)
    } else {
      setSearchMovies(null)
    }
  }

  return (
    <div className="relative">
      <motion.input
        initial={{ translateX: -20 }}
        animate={{ translateX: isShow ? 0 : -20 }}
        className="bg-black borders py-2 pl-12"
        style={{ display: isShow ? "block" : "none" }}
        placeholder="title, people, genres..."
        onChange={handleChange}
      />
      <GoSearch
        size={24}
        className={
          isShow ? "absolute top-1/2 -translate-y-1/2 left-3 z-10" : null
        }
        onClick={() => setIsShow(!isShow)}
      />
    </div>
  );
};

export default InputSearchMovies;
