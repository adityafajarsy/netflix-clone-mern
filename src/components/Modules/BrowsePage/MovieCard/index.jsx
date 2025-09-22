import ReactPlayer from "react-player";
import React, { useEffect, useState } from "react";
import { GoChevronDown, GoPlay, GoPlusCircle, GoTrash } from "react-icons/go";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import {
  emailStorageAtom,
  idMovieAtom,
  isFavoritedAtom,
  isFetchingAtom,
  isOpenModalAtom,
  tokenAtom,
} from "@/jotai/atoms";
import { getVideoUrl } from "@/utils/getVideoUrl";
import Skeleton from "./Skeleton";
import { useNavigate } from "react-router-dom";
import { axiosInstanceExpress } from "@/utils/axios";
import Notification from "../../Elements/Notification";
import { checkFavoriteMovies } from "@/utils/checkFavoriteMovies";

const MovieCard = ({ data, isHover, setIsHover }) => {
  const navigate = useNavigate();

  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [isFetching] = useAtom(isFetchingAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom);

  const [isSubmit, setIsSubmit] = useState(false);
  const [notifMessage, setNotifMessage] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleAddFavoriteMovie = async () => {
    if (!emailStorage && !tokenStorage) return;

    try {
      setIsSubmit(true);
      const addMovie = await axiosInstanceExpress.post("my-movies", {
        email: emailStorage,
        token: tokenStorage,
        data,
      });
      if (addMovie.status !== 201)
        return setNotifMessage(`Film ${data.title} Failed to Add`);
      setNotifMessage(`Film ${data.title} Success Added`);
      setIsFavorited(true);

      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 3000);
    } catch (error) {
      setNotifMessage(`Sorry, ${error.message}`);

      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 3000);
    }
  };

  const handleRemoveFavoriteMovies = async () => {
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
        return setNotifMessage(`"Failed to Remove Movie ${data.title}"`);
      }
      setNotifMessage(`${data.title} Success to Remove`);
      setIsFavorited(false);
      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 3000);
    } catch (error) {
      setNotifMessage(`Sorry, ${error.message}`);
      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 3000);
    }
  };

  if (isFetching) return <Skeleton />;

  return (
    <>
      {isSubmit && notifMessage && <Notification message={notifMessage} />}
      {isHover && idMovie === data.id ? (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ ease: "easeInOut", duration: 0 }}
          className="relative shadow-md transition-all w-full"
        >
          <div className="hover:scale-110 transition-all">
            <ReactPlayer
              url={`https://youtube.com/watch?v=${videoUrl}`}
              playing={true}
              loop={true}
              muted={true}
              width={"100%"}
              height={"180px"}
              controls={false}
            />
          </div>
          <div className="h-auto p-2 bg-[#141414] flex flex-col gap-1.5 ">
            <section className="mt-1 flex justify-between">
              <div className="flex gap-2 ">
                <button
                  onClick={() => navigate("/watch/" + videoUrl)}
                  className="cursor-pointer"
                >
                  <GoPlay size={32} />
                </button>
                <button
                  className="cursor-pointer"
                  onClick={
                    isFavorited
                      ? handleRemoveFavoriteMovies
                      : handleAddFavoriteMovie
                  }
                >
                  {isFavorited ? (
                    <GoTrash size={32} />
                  ) : (
                    <GoPlusCircle size={32} />
                  )}
                </button>
              </div>
              <div>
                <button
                  onClick={() => setIsOpenModal(true)}
                  className="rounded-full p-1 border"
                >
                  <GoChevronDown size={20} />
                </button>
              </div>
            </section>
            <section className="text-left">
              <h2 className="font-semibold">{data.title}</h2>
              <p className="text-green-400">Popularity: {data.popularity}</p>
            </section>
          </div>
        </motion.div>
      ) : (
        <img
          onMouseEnter={() => {
            setIsHover(true);
            setIdMovie(data.id);
            getVideoUrl({ movie_id: data.id }).then((result) =>
              setVideoUrl(result)
            );
            checkFavoriteMovies({
              emailStorage,
              tokenStorage,
              idMovie: data.id,
            }).then((result) => setIsFavorited(result));
          }}
          src={`${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${data.poster_path}`}
          className="w-full max-h-72 object-cover rounded-xl cursor-pointer"
        />
      )}
    </>
  );
};

export default MovieCard;
