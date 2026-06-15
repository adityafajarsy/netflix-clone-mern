import React, { useEffect, useState } from "react";
import Recommendation from "./Recommendation";
import ReactPlayer from "react-player";
import { useAtom } from "jotai";
import {
  idMovieAtom,
  isOpenModalAtom,
  emailStorageAtom,
  tokenAtom,
  isFavoritedAtom,
} from "@/jotai/atoms";
import { MdClose } from "react-icons/md";
import { GoCheck, GoPlay, GoPlusCircle } from "react-icons/go";
import { getMovieDetail } from "@/utils/getMovieDetail";
import { getVideoUrl } from "@/utils/getVideoUrl";
import { useNavigate } from "react-router-dom";
import { axiosInstanceExpress } from "@/utils/axios";
import Notification from "../../Elements/Notification";
import { checkFavoriteMovies } from "@/utils/checkFavoriteMovies";

const Modal = () => {
  const [isOpenModal, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [videoUrl, setVideoUrl] = useState(null);

  const [movieDetail, setMovieDetail] = useState([]);
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom);

  const [isSubmit, setIsSubmit] = useState(false);
  const [notifMessage, setNotifMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (idMovie && isOpenModal) {
      getMovieDetail({ movie_id: idMovie }).then((result) =>
        setMovieDetail(result)
      );
      getVideoUrl({ movie_id: idMovie }).then((result) => setVideoUrl(result));
      checkFavoriteMovies({
        emailStorage,
        tokenStorage,
        idMovie: idMovie,
      }).then((result) => setIsFavorited(result));
    }
  }, [idMovie, isOpenModal, emailStorage, tokenStorage, setIsFavorited]);

  const handleAddFavoriteMovie = async () => {
    if (!emailStorage && !tokenStorage) return;

    try {
      setIsSubmit(true);
      const addMovie = await axiosInstanceExpress.post("my-movies", {
        email: emailStorage,
        token: tokenStorage,
        data: movieDetail,
      });
      if (addMovie.status !== 201)
        return setNotifMessage(`Film ${movieDetail.title} Failed to Add`);
      setNotifMessage(`Film ${movieDetail.title} Success Added`);
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
          movieID: movieDetail.id,
        },
      });
      if (removeMovie.status !== 204) {
        return setNotifMessage(`"Failed to Remove Movie ${movieDetail.title}"`);
      }
      setNotifMessage(`${movieDetail.title} Success to Remove`);
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

  const genreMapping = (genres) => {
    if (!genres) return "";

    let result = "";
    genres.map((genre, index) => {
      if (index === genres.length - 1) {
        result += genre.name;
      } else {
        result += genre.name + ", ";
      }
    });
    return result;
  };

  return (
    <dialog className={`modal ${isOpenModal ? "modal-open" : ""}`}>
      {isSubmit && notifMessage && <Notification message={notifMessage} />}
      <div className="modal-box w-full max-w-screen-md  p-0">
        <div className="relative">
          <div className="h-[400px] w-full ">
            <ReactPlayer
              width={"100%"}
              height={"100%"}
              playing={true}
              muted={true}
              loop={true}
              url={`https://youtube.com/watch?v=${videoUrl}`}
            />
          </div>
          <button
            className="absolute top-2 right-2 rounded-full border p-1"
            onClick={() => setIsOpenModal(false)}
          >
            <MdClose size={24} />
          </button>
          <div className="absolute bottom-1/2 left-10">
            <h2 className="text-4xl font-black text-white">
              {movieDetail?.title}
            </h2>
          </div>
          <div className="absolute bottom-1/2 translate-y-14 left-10">
            <div className="flex gap-4">
              <button
                className="bg-slate-50 w-32 text-black flex items-center justify-center gap-1 p-1.5 rounded-md font-bold text-xl"
                onClick={() => {
                  navigate("/watch/" + videoUrl);
                  setIsOpenModal(false);
                  setVideoUrl(null);
                  setMovieDetail([]);
                  setIdMovie(null)
                }}
              >
                <GoPlay size={32} /> Play
              </button>
              <button
                className="text-slate-400 hover:text-white"
                onClick={
                  isFavorited
                    ? handleRemoveFavoriteMovies
                    : handleAddFavoriteMovie
                }
              >
                {isFavorited ? (
                  <GoCheck size={44} className="text-green-500 animate-pulse" />
                ) : (
                  <GoPlusCircle size={44} />
                )}
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-1 px-4 py-2 text-white">
          <div>
            <div className="flex gap-2">
              <p>{movieDetail?.release_date}</p>
              <p className="text-green-400/90 ">
                {movieDetail?.runtime} Minutes
              </p>
            </div>
            <p className="mt-4">{movieDetail?.overview}</p>
          </div>
          <div className="flex flex-col gap-4">
            <p>Genre: {genreMapping(movieDetail?.genres)}</p>
            <p>Popularity: {movieDetail?.popularity}</p>
          </div>
        </div>
        <Recommendation />
      </div>
    </dialog>
  );
};

export default Modal;
