import React, { useState } from "react";
import { GoStar, GoPlusCircle, GoCheck } from "react-icons/go";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import {
  emailStorageAtom,
  isFavoritedAtom,
  isFetchingAtom,
  tokenAtom,
} from "@/jotai/atoms";
import { useNavigate } from "react-router-dom";
import Notification from "@/components/Modules/Elements/Notification";

const TVCard = ({ data }) => {
  const navigate = useNavigate();

  const [isFetching] = useAtom(isFetchingAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom);
  const [notifMessage, setNotifMessage] = useState(null);

  const handleCardClick = () => {
    if (data?.id) {
      navigate("/tv/" + data.id);
    }
  };

  if (isFetching) {
    return (
      <div className="flex flex-col gap-2.5 animate-pulse">
        <div className="w-full aspect-[2/3] rounded-2xl bg-[#27272A]" />
        <div className="h-4 w-3/4 bg-[#27272A] rounded" />
        <div className="h-3 w-1/2 bg-[#1C1C1F] rounded" />
      </div>
    );
  }

  const posterSrc = data?.poster_path
    ? `${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`
    : "https://via.placeholder.com/300x450/18181B/FAFAFA?text=No+Poster";

  const airYear = data?.first_air_date ? data.first_air_date.split("-")[0] : null;
  const displayName = data?.name || data?.original_name || "TV Series";

  return (
    <>
      {notifMessage && <Notification message={notifMessage} />}

      <div className="flex flex-col group cursor-pointer select-none" onClick={handleCardClick}>
        {/* Poster Container */}
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#18181B] border border-[#3F3F46]/40 group-hover:border-[#7C3AED]/70 shadow-lg group-hover:shadow-2xl group-hover:shadow-[#7C3AED]/25 transition-all duration-300"
        >
          <img
            src={posterSrc}
            alt={displayName}
            className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
            loading="lazy"
          />

          {/* Rating Badge */}
          {data?.vote_average > 0 && (
            <div className="absolute top-2.5 right-2.5 z-10 bg-[#09090B]/80 backdrop-blur-md border border-[#3F3F46]/60 text-[#FAFAFA] text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-md group-hover:border-[#7C3AED]/40 transition-colors">
              <GoStar className="text-yellow-400 fill-yellow-400" size={12} />
              <span>{data.vote_average.toFixed(1)}</span>
            </div>
          )}

          {/* TV Badge */}
          <div className="absolute bottom-2.5 left-2.5 z-10 bg-[#7C3AED]/80 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider shadow-md">
            TV
          </div>
        </motion.div>

        {/* Info Below Poster */}
        <div className="mt-2.5 px-0.5 flex flex-col gap-0.5 text-left">
          <h4 className="text-[#FAFAFA] font-bold text-sm sm:text-base line-clamp-1 group-hover:text-[#8B5CF6] transition-colors">
            {displayName}
          </h4>
          <div className="flex items-center justify-between text-xs text-[#A1A1AA] font-medium">
            <span>{airYear || "TV Series"}</span>
            {data?.original_language && (
              <span className="uppercase text-[10px] text-[#A1A1AA] bg-[#18181B] border border-[#3F3F46]/50 px-1.5 rounded">
                {data.original_language}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TVCard;
