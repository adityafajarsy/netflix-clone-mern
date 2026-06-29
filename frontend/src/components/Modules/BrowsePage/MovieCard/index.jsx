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
import Skeleton from "./Skeleton";
import { useNavigate } from "react-router-dom";
import { axiosInstanceExpress } from "@/utils/axios";
import Notification from "../../Elements/Notification";
import { checkFavoriteMovies } from "@/utils/checkFavoriteMovies";

const MovieCard = ({ data }) => {
  const navigate = useNavigate();

  const [isFetching] = useAtom(isFetchingAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom);

  const [isSubmit, setIsSubmit] = useState(false);
  const [notifMessage, setNotifMessage] = useState(null);

  const handleCardClick = () => {
    if (data?.id) {
      navigate("/movie/" + data.id);
    }
  };

  const handleAddFavoriteMovie = async (e) => {
    e.stopPropagation();
    if (!emailStorage && !tokenStorage) {
      navigate("/login");
      return;
    }

    try {
      setIsSubmit(true);
      const addMovie = await axiosInstanceExpress.post("my-movies", {
        email: emailStorage,
        token: tokenStorage,
        data,
      });
      if (addMovie.status !== 201)
        return setNotifMessage(`Failed to add ${data.title}`);
      setNotifMessage(`Added ${data.title} to favorites`);
      setIsFavorited(true);

      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 2500);
    } catch (error) {
      setNotifMessage(`Error: ${error.message}`);
      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 2500);
    }
  };

  const handleRemoveFavoriteMovies = async (e) => {
    e.stopPropagation();
    if (!emailStorage && !tokenStorage) return;
    try {
      setIsSubmit(true);
      const removeMovie = await axiosInstanceExpress.delete("my-movies", {
        data: {
          email: emailStorage,
          token: tokenStorage,
          movieID: data.id,
        },
      });
      if (removeMovie.status !== 204) {
        return setNotifMessage(`Failed to remove ${data.title}`);
      }
      setNotifMessage(`Removed ${data.title} from favorites`);
      setIsFavorited(false);
      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 2500);
    } catch (error) {
      setNotifMessage(`Error: ${error.message}`);
      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 2500);
    }
  };

  if (isFetching) return <Skeleton />;

  const posterSrc = data?.poster_path
    ? `${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`
    : "https://via.placeholder.com/300x450/18181B/FAFAFA?text=No+Poster";

  const releaseYear = data?.release_date ? data.release_date.split("-")[0] : null;

  return (
    <>
      {isSubmit && notifMessage && <Notification message={notifMessage} />}
      
      <div className="flex flex-col group cursor-pointer select-none" onClick={handleCardClick}>
        {/* Poster Container */}
        <motion.div
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          onMouseEnter={() => {
            if (emailStorage && tokenStorage && data?.id) {
              checkFavoriteMovies({
                emailStorage,
                tokenStorage,
                idMovie: String(data.id),
              }).then((result) => setIsFavorited(result));
            }
          }}
          className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden bg-[#18181B] border border-[#3F3F46]/40 group-hover:border-[#7C3AED]/70 shadow-lg group-hover:shadow-2xl group-hover:shadow-[#7C3AED]/25 transition-all duration-300"
        >
          {/* Poster Image */}
          <img
            src={posterSrc}
            alt={data?.title || "Movie Poster"}
            className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105 group-hover:brightness-110"
            loading="lazy"
          />

          {/* Rating Badge Overlay */}
          {data?.vote_average > 0 && (
            <div className="absolute top-2.5 right-2.5 z-10 bg-[#09090B]/80 backdrop-blur-md border border-[#3F3F46]/60 text-[#FAFAFA] text-xs font-bold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-md group-hover:border-[#7C3AED]/40 transition-colors">
              <GoStar className="text-yellow-400 fill-yellow-400" size={12} />
              <span>{data.vote_average.toFixed(1)}</span>
            </div>
          )}

          {/* Quick Favorite Action Button on Hover */}
          <motion.button
            whileTap={{ scale: 0.85 }}
            onClick={isFavorited ? handleRemoveFavoriteMovies : handleAddFavoriteMovie}
            className={`absolute top-2.5 left-2.5 z-10 p-2 rounded-xl border text-xs backdrop-blur-md transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg cursor-pointer ${
              isFavorited
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/30"
                : "bg-[#09090B]/80 border-[#3F3F46] text-[#FAFAFA] hover:bg-[#27272A] hover:border-[#7C3AED]/50"
            }`}
            title={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorited ? <GoCheck size={14} /> : <GoPlusCircle size={14} />}
          </motion.button>
        </motion.div>

        {/* Movie Info OUTSIDE Card Below Poster */}
        <div className="mt-2.5 px-0.5 flex flex-col gap-0.5 text-left">
          <h4 className="text-[#FAFAFA] font-bold text-sm sm:text-base line-clamp-1 group-hover:text-[#8B5CF6] transition-colors">
            {data?.title}
          </h4>

          <div className="flex items-center justify-between text-xs text-[#A1A1AA] font-medium">
            <span>{releaseYear || "Movie"}</span>
            {data?.original_language && (
              <span className="uppercase text-[10px] text-[#A1A1AA] bg-[#18181B] border border-[#3F3F46]/50 px-1.5 py-0.2 rounded">
                {data.original_language}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieCard;


