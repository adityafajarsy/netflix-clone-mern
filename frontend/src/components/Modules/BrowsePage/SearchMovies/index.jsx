import { idMovieAtom, isFetchingAtom, searchMoviesAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { searchMovies } from "@/utils/searchMovies";
import EachUtils from "@/utils/EachUtils";
import MovieCard from "../MovieCard";
const SearchMovies = () => {
  const [, setIdMovie] = useAtom(idMovieAtom);
  const [searchQuery] = useAtom(searchMoviesAtom);
  const [, setIsFetching] = useAtom(isFetchingAtom);

  const [movieList, setMovieList] = useState([]);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    if (searchQuery) {
      searchMovies({ query: searchQuery })
        .then((result) => {
          setIsFetching(true);
          setMovieList(result);
        })
        .finally(() => {
          setTimeout(() => {
            setIsFetching(false);
          }, 500);
        });
    }
  }, [searchQuery]);

  return (
    <div className="max-w-7xl mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-12">
      <h2 className="text-xl sm:text-2xl font-bold text-[#FAFAFA] mb-6 select-none flex items-center gap-2">
        <span className="text-[#A1A1AA]">Search Results for:</span>
        <span className="text-[#8B5CF6]">"{searchQuery}"</span>
      </h2>
      
      {movieList.length === 0 ? (
        <div className="bg-[#18181B] border border-[#3F3F46]/40 rounded-2xl p-12 text-center max-w-lg mx-auto mt-8">
          <p className="text-lg font-medium text-[#A1A1AA]">No movies found.</p>
          <p className="text-sm text-[#A1A1AA]/70 mt-1">Try searching with a different keyword.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          <EachUtils
            of={movieList}
            render={(item, index) => (
              <div
                key={item.id || index}
                onMouseLeave={() => {
                  setIsHover(false);
                  setIdMovie(null);
                }}
              >
                <MovieCard data={item} isHover={isHover} setIsHover={setIsHover} />
              </div>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default SearchMovies;
