import EachUtils from "@/utils/EachUtils";
import React, { useEffect, useState } from "react";
import MovieCard from "../MovieCard";
import CarouselLayout from "@/components/Layouts/CarouselLayout";
import { useAtom } from "jotai";
import { isFetchingAtom } from "@/jotai/atoms";
import { getMoviesByType } from "@/utils/getMoviesByType";

const MovieList = ({ title, moviesType }) => {
  const [movieList, setMovieList] = useState([]);
  const [, setIsFetching] = useAtom(isFetchingAtom);

  useEffect(() => {
    if (moviesType) {
      getMoviesByType({ moviesType })
        .then((result) => {
          setIsFetching(true);
          setMovieList(result);
        })
        .finally(() => {
          setTimeout(() => {
            setIsFetching(false);
          }, 400);
        });
    }
  }, [moviesType]);

  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-12 py-6 relative">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-5 select-none">
        <div className="w-1.5 h-6 bg-gradient-to-b from-[#7C3AED] to-[#8B5CF6] rounded-full" />
        <h3 className="text-2xl font-bold tracking-tight text-[#FAFAFA] font-sans">
          {title}
        </h3>
      </div>

      {/* Carousel Container */}
      <CarouselLayout>
        <EachUtils
          of={movieList}
          render={(item, index) => (
            <div
              className="w-[135px] sm:w-[150px] md:w-[165px] lg:w-[175px] xl:w-[180px] shrink-0"
              key={item.id || index}
            >
              <MovieCard data={item} />
            </div>
          )}
        />
      </CarouselLayout>
    </section>
  );
};

export default MovieList;


