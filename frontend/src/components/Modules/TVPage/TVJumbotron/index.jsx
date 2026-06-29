import React, { useEffect, useState } from "react";
import { GoPlay, GoStar, GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { getTVByType } from "@/utils/getTVByType";
import { useAtom } from "jotai";
import { emailStorageAtom, tokenAtom } from "@/jotai/atoms";
import { motion, AnimatePresence } from "framer-motion";

const TVJumbotron = () => {
  const navigate = useNavigate();
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);

  const [tvList, setTvList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    getTVByType({ tvType: "popular" }).then((result) => {
      if (result && result.length > 0) {
        setTvList(result.slice(0, 8));
      }
    });
  }, []);

  // Auto-rotate every 8s
  useEffect(() => {
    if (tvList.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tvList.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [tvList]);

  if (tvList.length === 0)
    return <div className="h-[75vh] bg-[#09090B] animate-pulse" />;

  const current = tvList[currentIndex];
  const airYear = current.first_air_date ? current.first_air_date.split("-")[0] : null;
  const backdropUrl = current.backdrop_path
    ? `https://image.tmdb.org/t/p/original${current.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${current.poster_path}`;

  const handleWatchNow = () => {
    if (!emailStorage && !tokenStorage) {
      navigate("/login");
      return;
    }
    navigate(`/tv/${current.id}`);
  };

  return (
    <div className="relative w-full h-[75vh] sm:h-[82vh] min-h-[520px] sm:min-h-[640px] max-h-[880px] overflow-hidden bg-[#09090B] select-none pt-20 sm:pt-24">
      {/* Cinematic Backdrop with Fade */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.04 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      </AnimatePresence>

      {/* Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/85 to-transparent w-full lg:w-3/5 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/70 via-transparent to-transparent h-20 z-10" />

      {/* TV Badge glow */}
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[120px] z-0 pointer-events-none" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-8 sm:pb-12 lg:pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-2xl flex flex-col gap-3 sm:gap-4 mt-8 sm:mt-12"
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
              <span className="bg-[#7C3AED] text-white px-2 sm:px-2.5 py-0.5 rounded font-bold text-[10px] sm:text-[11px] shadow-md shadow-[#7C3AED]/30">
                TV SERIES
              </span>
              {airYear && <span>{airYear}</span>}
              <span>•</span>
              {current.vote_average > 0 && (
                <span className="flex items-center gap-1 text-[#FAFAFA] font-bold">
                  <GoStar className="text-yellow-400 fill-yellow-400" size={12} />
                  {current.vote_average.toFixed(1)}
                </span>
              )}
              <span>•</span>
              <span className="text-[#A1A1AA] lowercase">{current.original_language?.toUpperCase()}</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline-block text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                POPULARITY {Math.round(current.popularity)}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#FAFAFA] leading-none drop-shadow-lg uppercase font-sans">
              {current.name}
            </h1>

            {/* Overview */}
            <p className="text-xs sm:text-sm md:text-base text-[#A1A1AA] line-clamp-2 sm:line-clamp-3 leading-relaxed max-w-xl font-normal drop-shadow-sm">
              {current.overview}
            </p>

            {/* CTA */}
            <div className="flex flex-wrap items-center gap-4 mt-1 sm:mt-2">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                onClick={handleWatchNow}
                className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white py-3 sm:py-3.5 px-6 sm:px-8 rounded-xl text-sm sm:text-base font-semibold flex items-center gap-2.5 shadow-lg shadow-[#7C3AED]/35 transition-all cursor-pointer"
              >
                <GoPlay size={20} className="fill-current" />
                <span>Watch Now</span>
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5 sm:gap-2 mt-4 sm:mt-6 z-30">
          {tvList.map((_, idx) => (
            <motion.button
              whileTap={{ scale: 0.8 }}
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`transition-all duration-300 cursor-pointer ${
                idx === currentIndex
                  ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-[#7C3AED] rounded-full shadow-md shadow-[#7C3AED]/50"
                  : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-[#3F3F46] hover:bg-[#A1A1AA] rounded-full"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TVJumbotron;
