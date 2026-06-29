import { idMovieAtom, isOpenModalAtom } from "@/jotai/atoms";
import { getMoviesByType } from "@/utils/getMoviesByType";
import { getVideoUrl } from "@/utils/getVideoUrl";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { GoPlay, GoInfo, GoStar, GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";

const Jumbotron = () => {
  const navigate = useNavigate();
  const [, setIdMovieAtom] = useAtom(idMovieAtom);
  const [, setIsOpenModal] = useAtom(isOpenModalAtom);

  const [topMoviesList, setTopMoviesList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isWatching, setIsWatching] = useState(false);

  useEffect(() => {
    getMoviesByType({ moviesType: "popular" }).then((result) => {
      if (result && result.length > 0) {
        setTopMoviesList(result.slice(0, 8));
      }
    });
  }, []);

  // Auto rotate banner every 8 seconds
  useEffect(() => {
    if (topMoviesList.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topMoviesList.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [topMoviesList]);

  if (topMoviesList.length === 0) return <div className="h-[75vh] bg-[#09090B] animate-pulse" />;

  const currentMovie = topMoviesList[currentIndex];
  const releaseYear = currentMovie.release_date ? currentMovie.release_date.split("-")[0] : null;
  const backdropUrl = currentMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : `https://image.tmdb.org/t/p/original${currentMovie.poster_path}`;

  const handleWatchNow = async () => {
    setIsWatching(true);
    try {
      const videoUrl = await getVideoUrl({ movie_id: currentMovie.id });
      if (videoUrl) {
        navigate("/watch/" + videoUrl);
      } else {
        // Fallback if video URL not found
        setIdMovieAtom(currentMovie.id);
        setIsOpenModal(true);
      }
    } catch (err) {
      setIdMovieAtom(currentMovie.id);
      setIsOpenModal(true);
    } finally {
      setIsWatching(false);
    }
  };

  return (
    <div className="relative w-full h-[82vh] min-h-[640px] max-h-[880px] overflow-hidden bg-[#09090B] select-none pt-24">
      {/* Cinematic Backdrop Image */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-in-out scale-105"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      />

      {/* Vignette Gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-[#09090B]/80 to-transparent w-full lg:w-3/5 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/40 to-transparent z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/70 via-transparent to-transparent h-20 z-10" />

      {/* Hero Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto h-full px-6 lg:px-12 flex flex-col justify-end pb-12 lg:pb-16">
        <div className="max-w-2xl flex flex-col gap-4 mt-12">
          
          {/* Rich API Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
            <span className="bg-[#EF4444] text-white px-2.5 py-0.5 rounded font-bold text-[11px]">
              FEATURED
            </span>
            {releaseYear && <span>{releaseYear}</span>}
            <span>•</span>
            {currentMovie.vote_average > 0 && (
              <span className="flex items-center gap-1 text-[#FAFAFA] font-bold">
                <GoStar className="text-yellow-400 fill-yellow-400" size={14} />
                {currentMovie.vote_average.toFixed(1)}
              </span>
            )}
            <span>•</span>
            <span className="text-[#A1A1AA] lowercase">{currentMovie.original_language?.toUpperCase()}</span>
            <span>•</span>
            <span className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
              POPULARITY {Math.round(currentMovie.popularity)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#FAFAFA] leading-none drop-shadow-lg uppercase font-sans">
            {currentMovie.title}
          </h1>

          {/* Overview Description */}
          <p className="text-sm sm:text-base text-[#A1A1AA] line-clamp-3 leading-relaxed max-w-xl font-normal drop-shadow-sm">
            {currentMovie.overview}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button
              disabled={isWatching}
              className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-white py-3.5 px-8 rounded-xl text-base font-semibold flex items-center gap-2.5 shadow-lg shadow-[#7C3AED]/30 transition-all duration-200 active:scale-95 cursor-pointer disabled:opacity-50"
              onClick={handleWatchNow}
            >
              <GoPlay size={22} className="fill-current" />
              <span>{isWatching ? "Loading..." : "Watch Now"}</span>
            </button>
          </div>

          {/* Carousel Slider Pagination Dots */}
          <div className="flex items-center gap-2 mt-6">
            {topMoviesList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 cursor-pointer ${
                  idx === currentIndex
                    ? "w-8 h-2 bg-[#7C3AED] rounded-full"
                    : "w-2 h-2 bg-[#3F3F46] hover:bg-[#A1A1AA] rounded-full"
                }`}
                title={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Jumbotron;


