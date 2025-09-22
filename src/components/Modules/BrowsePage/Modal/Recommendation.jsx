import EachUtils from "@/utils/EachUtils";
import { idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";
import { getMoviesRecommendation } from "@/utils/getMoviesRecommendation";
import { getVideoUrl } from "@/utils/getVideoUrl";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { GoPlay, GoStar } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Recommendation = () => {
  const navigate = useNavigate();

  const [idMovie] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);
  const [moviesRecommendation, setMoviesRecommendation] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    if (idMovie) {
      getMoviesRecommendation({ movie_id: idMovie }).then((result) =>
        setMoviesRecommendation(result)
      );
    }
  }, [idMovie]);

  return (
    <div className="px-4 py-2">
      <h2 className="text-2xl font-bold mt-4">Movies Recommendation</h2>
      <div className="grid grid-cols-3 gap-2 mt-4">
        <EachUtils
          of={moviesRecommendation}
          render={(item, index) => (
            <div
              key={index}
              className="w-full h-auto rounded-mdbg-[#141414]"
              onMouseEnter={() => {
                getVideoUrl({ movie_id: item.id }).then((result) =>
                  setVideoUrl(result)
                );
              }}
            >
              <div className="relative">
                <img
                  src={
                    import.meta.env.VITE_BASE_URL_TMDB_IMAGE + item.poster_path
                  }
                  className="w-full h-48 rounded-t-md"
                />
                <button
                  className="absolute top-10 left-1/2 cursor-pointer  -translate-x-1/2"
                  onClick={() => {
                    {
                      navigate("/watch/" + videoUrl);
                      setIsOpenModal(false);
                    }
                  }}
                >
                  <GoPlay size={44} />
                </button>
              </div>
              <div className="p-2">
                <div className="flex gap-5">
                  <p>{item.release_date}</p>

                  <p className="flex flex-row items-center justify-center gap-1 text-yellow-300">
                    <GoStar />
                    {item.vote_average}
                  </p>
                </div>
                <p className="text-w rap pt-2 max-h-32 overflow-y-scroll">
                  {item.overview}
                </p>
              </div>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default Recommendation;
