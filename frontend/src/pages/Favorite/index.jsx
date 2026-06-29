import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import MovieCard from "@/components/Modules/BrowsePage/MovieCard";
import BrowseLayout from "@/components/Layouts/BrowseLayout";
import { useAtom } from "jotai";
import { emailStorageAtom, isFavoritedAtom, tokenAtom } from "@/jotai/atoms";
import { axiosInstanceExpress } from "@/utils/axios";

const Favorite = () => {
  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [isFavorited] = useAtom(isFavoritedAtom);

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
      getFavoriteMovies().then((result) => {
        if (result && result.data && result.data.favoriteMovies) {
          setMovieList(result.data.favoriteMovies);
        }
      });
    }
  }, [emailStorage, tokenStorage, isFavorited]);

  return (
    <BrowseLayout>
      <div className="max-w-7xl mx-auto pt-28 px-6 lg:px-12 min-h-[70vh] pb-20">
        <div className="flex items-center gap-3 mb-6 select-none">
          <div className="w-1.5 h-7 bg-gradient-to-b from-[#7C3AED] to-[#8B5CF6] rounded-full" />
          <h3 className="text-3xl font-bold tracking-tight text-[#FAFAFA] font-sans">
            My Favorite Movies
          </h3>
        </div>

        {movieList.length === 0 ? (
          <div className="bg-[#18181B] border border-[#3F3F46]/40 rounded-2xl p-12 text-center max-w-lg mx-auto mt-12">
            <p className="text-lg font-medium text-[#A1A1AA]">Your favorite list is empty.</p>
            <p className="text-sm text-[#A1A1AA]/70 mt-1">Explore movies and click the bookmark icon to save them here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 mt-6">
            <EachUtils
              of={movieList}
              render={(item, index) => (
                <div key={item.id || index}>
                  <MovieCard data={item} />
                </div>
              )}
            />
          </div>
        )}
      </div>
    </BrowseLayout>
  );
};

export default Favorite;
