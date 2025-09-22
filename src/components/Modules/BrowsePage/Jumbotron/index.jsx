import { idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";
import { getMoviesByType } from "@/utils/getMoviesByType";
import { getVideoUrl } from "@/utils/getVideoUrl";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { GoMute, GoPlay, GoUnmute } from "react-icons/go";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

const Jumbotron = () => {
  const navigate = useNavigate();
  const [idMovie, setIdMovie] = useState(null);
  const [, setIdMovieAtom] = useAtom(idMovieAtom)

  const [, setIsOpenModal] = useAtom(isOpenModalAtom);


  const [isMuted, setIsMuted] = useState(true);
  const [topMovies, setTopMovies] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    getMoviesByType({ moviesType: "top_rated" })
      .then((result) => {
        setTopMovies(result[0]);
        setIdMovie(result[0].id);
      })
      .finally(() =>
        getVideoUrl({ movie_id: idMovie }).then((result) => setVideoUrl(result))
      );
  }, [idMovie]);

  return (
    <div className="relative h-[500px] w-full">
      <ReactPlayer
        url={"https://youtube.com/watch?v=" + videoUrl}
        width="100%"
        height="700px"
        playing={true}
        muted={isMuted}
        controls={false}
        loop={true}
        style={{opacity: "75%"}}
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-0 p-8 max-w-md">
        <div className="flex flex-col gap-4 text-white">
          <h1 className="text-3xl sm:text-5xl font-black ">{topMovies.title}</h1>
          <p className="hidden md:block">{topMovies.overview}</p>
        </div>
        <div className="flex gap-4 mt-4">
          <button
            className="bg-gray-200 py-2 px-8 rounded-md text-xl font-bold text-black flex items-center gap-1"
            onClick={() => {
              navigate("/watch/" + videoUrl);
              setIsMuted(true);
            }}
          >
            <GoPlay /> Play
          </button>
          <button className="bg-sote-600/80 py-2 px-8 rounded-md text-white"
          onClick={() => {
            setIdMovieAtom(idMovie)
            setIsOpenModal(true)}}>
            More Detail
          </button>
        </div>
      </div>
      <div className="absolute right-6 bottom-1/2 -translate-y-1/2">
        <div
          className="border rounded-full p-2 cursor-pointer transform transition-all active:scale-110 duration-50"
          onClick={() => setIsMuted(!isMuted)}
        >
          {isMuted ? <GoMute size={24} /> : <GoUnmute size={24} />}
        </div>
      </div>
    </div>
  );
};

export default Jumbotron;
