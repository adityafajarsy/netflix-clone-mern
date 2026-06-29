import React, { useEffect, useState, useCallback } from "react";
import BrowseLayout from "@/components/Layouts/BrowseLayout";
import { getMoviesByGenre } from "@/utils/getGenres";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GoStar, GoPlusCircle } from "react-icons/go";
import { motion } from "framer-motion";
import Footer from "@/components/Modules/LandingPage/Footer";

const GenreMovies = () => {
  const { genreId } = useParams();
  const [searchParams] = useSearchParams();
  const genreName = searchParams.get("name") || "Genre";
  const navigate = useNavigate();

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchMovies = useCallback(async (pageNum, reset = false) => {
    if (reset) setLoading(true);
    else setLoadingMore(true);

    const data = await getMoviesByGenre({ genreId, page: pageNum });

    setMovies((prev) => (reset ? data.results : [...prev, ...data.results]));
    setTotalPages(data.totalPages);
    setTotalResults(data.totalResults);
    setLoading(false);
    setLoadingMore(false);
  }, [genreId]);

  useEffect(() => {
    setPage(1);
    fetchMovies(1, true);
  }, [genreId]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, false);
  };

  return (
    <BrowseLayout>
      <div className="min-h-screen bg-[#09090B] pt-28 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 select-none">
          <button
            onClick={() => navigate("/genres")}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#A1A1AA] hover:text-[#FAFAFA] bg-[#18181B]/80 hover:bg-[#27272A] px-3 py-1.5 rounded-xl border border-[#3F3F46]/50 transition-all cursor-pointer mb-5"
          >
            ← All Genres
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-8 bg-gradient-to-b from-[#7C3AED] to-[#8B5CF6] rounded-full" />
            <h1 className="text-4xl font-black tracking-tight text-[#FAFAFA] font-sans">
              {genreName}
            </h1>
          </div>
          {totalResults > 0 && (
            <p className="text-[#A1A1AA] text-sm ml-5 mt-1">
              {totalResults.toLocaleString()} titles found
            </p>
          )}
        </div>

        {/* Loading skeleton grid */}
        {loading ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
            {Array.from({ length: 21 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-2 animate-pulse">
                <div className="w-full aspect-[2/3] rounded-xl bg-[#27272A]" />
                <div className="h-3 w-3/4 bg-[#27272A] rounded" />
              </div>
            ))}
          </div>
        ) : (
          <>
            {movies.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-[#A1A1AA]">
                <span className="text-5xl mb-4">🎬</span>
                <p className="text-xl font-bold">No movies found</p>
                <p className="text-sm mt-2">Try another genre</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
                {movies.map((movie, index) => {
                  const posterSrc = movie.poster_path
                    ? `${import.meta.env.VITE_BASE_URL_TMDB_IMAGE}${movie.poster_path}`
                    : "https://via.placeholder.com/300x450/18181B/FAFAFA?text=No+Poster";
                  const title = movie.title || movie.name || "Untitled";
                  const year = (movie.release_date || movie.first_air_date || "").split("-")[0];

                  return (
                    <motion.div
                      key={movie.id || index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: Math.min(index % 14, 10) * 0.03 }}
                      className="group flex flex-col cursor-pointer select-none"
                      onClick={() => navigate("/movie/" + movie.id)}
                    >
                      <div className="relative w-full aspect-[2/3] rounded-xl overflow-hidden bg-[#18181B] border border-[#3F3F46]/40 group-hover:border-[#7C3AED]/60 shadow-md group-hover:shadow-xl group-hover:shadow-[#7C3AED]/20 transition-all duration-200">
                        <img
                          src={posterSrc}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-all duration-300"
                          loading="lazy"
                        />
                        {movie.vote_average > 0 && (
                          <div className="absolute top-1.5 right-1.5 bg-[#09090B]/80 backdrop-blur-md border border-[#3F3F46]/60 text-[#FAFAFA] text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                            <GoStar className="text-yellow-400 fill-yellow-400" size={10} />
                            <span>{movie.vote_average.toFixed(1)}</span>
                          </div>
                        )}
                      </div>
                      <div className="mt-1.5 px-0.5">
                        <h4 className="text-[#FAFAFA] font-semibold text-xs sm:text-sm line-clamp-1 group-hover:text-[#8B5CF6] transition-colors">
                          {title}
                        </h4>
                        {year && <span className="text-[10px] text-[#71717A]">{year}</span>}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}

            {/* Load More Button */}
            {page < totalPages && movies.length > 0 && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] hover:from-[#8B5CF6] hover:to-[#7C3AED] text-white font-bold text-sm px-10 py-3.5 rounded-xl shadow-lg shadow-[#7C3AED]/25 transition-all duration-300 active:scale-[0.98] disabled:opacity-60 cursor-pointer flex items-center gap-2"
                >
                  {loadingMore ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Loading...
                    </>
                  ) : (
                    `Load More  •  Page ${page} / ${totalPages}`
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </BrowseLayout>
  );
};

export default GenreMovies;
