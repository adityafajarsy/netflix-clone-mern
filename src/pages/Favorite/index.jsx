import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import MovieCard from "@/components/Modules/BrowsePage/MovieCard";
import BrowseLayout from "@/components/Layouts/BrowseLayout";

import { useAtom } from "jotai";
import { emailStorageAtom, idMovieAtom, isFavoritedAtom, tokenAtom } from "@/jotai/atoms";
import { axiosInstanceExpress } from "@/utils/axios";
import Modal from "@/components/Modules/BrowsePage/Modal";

const Favorite = () => {
  const [isHover, setIsHover] = useState(false);
  const [idMovie, setIdMovie] = useAtom(idMovieAtom);
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [isFavorited] = useAtom(isFavoritedAtom)

  const [movieList, setMovieList] = useState([]);

  const getFavoriteMovies = async () => {
    try {
      const url = `my-movies/${emailStorage}/${tokenStorage}`;
      const movies = await axiosInstanceExpress.get(url);
      if (movies.status === 200) return movies.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };


  useEffect(() => {
    if (emailStorage && tokenStorage) {
      getFavoriteMovies().then((result) =>
        setMovieList(result.data.favoriteMovies)
      );
    }
  }, [emailStorage, tokenStorage, isFavorited]);

  return (
    <BrowseLayout>
      <div className="mt-20 px-8">
        <h3 className="text-white font-bold text-2xl">My Favorite Movies</h3>
        {movieList.length === 0 && <p>You Have No Favorite Movies List!</p>}
      </div>
      <div className="grid sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 grid-cols-2 gap-4 px-8 mt-4">
        <EachUtils
          of={movieList}
          render={(item, index) => (
            <div key={index}>
              <div
                className="h-72 mt-4"
                key={index}
                onMouseLeave={() => {
                  setIsHover(false);
                  setIdMovie(null);
                }}
              >
                <MovieCard
                  data={item}
                  isHover={isHover}
                  setIsHover={setIsHover}
                />
              </div>
            </div>
          )}
        />
      </div>
      <Modal />
    </BrowseLayout>
  );
};

export default Favorite;
