import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BrowseLayout from "@/components/Layouts/BrowseLayout";
import { getMovieDetail } from "@/utils/getMovieDetail";
import { getVideoUrl } from "@/utils/getVideoUrl";
import { getMoviesRecommendation } from "@/utils/getMoviesRecommendation";
import { checkFavoriteMovies } from "@/utils/checkFavoriteMovies";
import { axiosInstanceExpress } from "@/utils/axios";
import { useAtom } from "jotai";
import { emailStorageAtom, tokenAtom, isFavoritedAtom } from "@/jotai/atoms";
import { GoPlay, GoStar, GoPlusCircle, GoCheck, GoClock, GoCalendar, GoGlobe, GoArrowLeft } from "react-icons/go";
import MovieCard from "@/components/Modules/BrowsePage/MovieCard";
import CarouselLayout from "@/components/Layouts/CarouselLayout";
import EachUtils from "@/utils/EachUtils";
import Notification from "@/components/Modules/Elements/Notification";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const [emailStorage] = useAtom(emailStorageAtom);
  const [tokenStorage] = useAtom(tokenAtom);
  const [isFavorited, setIsFavorited] = useAtom(isFavoritedAtom);

  const [isSubmit, setIsSubmit] = useState(false);
  const [notifMessage, setNotifMessage] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      window.scrollTo(0, 0);

      Promise.all([
        getMovieDetail({ movie_id: id }),
        getVideoUrl({ movie_id: id }),
        getMoviesRecommendation({ movie_id: id }),
      ]).then(([detailRes, videoRes, recRes]) => {
        setMovie(detailRes);
        setVideoUrl(videoRes);
        if (recRes) setRecommendations(recRes);
        setLoading(false);
      });

      if (emailStorage && tokenStorage) {
        checkFavoriteMovies({
          emailStorage,
          tokenStorage,
          idMovie: id,
        }).then((res) => setIsFavorited(res));
      }
    }
  }, [id, emailStorage, tokenStorage, setIsFavorited]);

  const handleAddFavorite = async () => {
    if (!emailStorage && !tokenStorage) {
      navigate("/login");
      return;
    }

    try {
      setIsSubmit(true);
      const addRes = await axiosInstanceExpress.post("my-movies", {
        email: emailStorage,
        token: tokenStorage,
        data: movie,
      });
      if (addRes.status !== 201) return setNotifMessage(`Failed to add ${movie.title}`);
      setNotifMessage(`Added ${movie.title} to favorites`);
      setIsFavorited(true);
      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 2500);
    } catch (err) {
      setNotifMessage(`Error: ${err.message}`);
      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 2500);
    }
  };

  const handleRemoveFavorite = async () => {
    if (!emailStorage && !tokenStorage) return;
    try {
      setIsSubmit(true);
      const removeRes = await axiosInstanceExpress.delete("my-movies", {
        data: {
          email: emailStorage,
          token: tokenStorage,
          movieID: movie.id,
        },
      });
      if (removeRes.status !== 204) return setNotifMessage(`Failed to remove ${movie.title}`);
      setNotifMessage(`Removed ${movie.title} from favorites`);
      setIsFavorited(false);
      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 2500);
    } catch (err) {
      setNotifMessage(`Error: ${err.message}`);
      setTimeout(() => {
        setIsSubmit(false);
        setNotifMessage(null);
      }, 2500);
    }
  };

  if (loading) {
    return (
      <BrowseLayout>
        <div className="min-h-screen bg-[#09090B] pt-28 px-6 lg:px-12 max-w-7xl mx-auto animate-pulse flex flex-col gap-8">
          <div className="h-96 bg-[#18181B] rounded-2xl w-full"></div>
          <div className="h-10 bg-[#18181B] rounded-md w-1/3"></div>
        </div>
      </BrowseLayout>
    );
  }

  if (!movie) {
    return (
      <BrowseLayout>
        <div className="min-h-screen bg-[#09090B] pt-32 px-6 text-center text-[#FAFAFA]">
          <h2 className="text-2xl font-bold">Movie details not found</h2>
          <button
            onClick={() => navigate("/browse")}
            className="mt-4 px-6 py-2 bg-[#7C3AED] text-white rounded-xl font-semibold"
          >
            Back to Browse
          </button>
        </div>
      </BrowseLayout>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : null;

  return (
    <BrowseLayout>
      {isSubmit && notifMessage && <Notification message={notifMessage} />}

      <div className="min-h-screen bg-[#09090B] text-[#FAFAFA] relative">
        {/* Backdrop Header Container */}
        <div className="relative w-full h-[55vh] min-h-[420px] overflow-hidden">
          {backdropUrl && (
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 scale-105"
              style={{ backgroundImage: `url(${backdropUrl})` }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090B] via-[#09090B]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#09090B] via-transparent to-transparent" />

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-24 left-6 lg:left-12 z-20 flex items-center gap-2 bg-[#18181B]/80 hover:bg-[#27272A] border border-[#3F3F46] text-[#FAFAFA] px-4 py-2 rounded-xl backdrop-blur-md transition-all cursor-pointer text-sm font-semibold"
          >
            <GoArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>

        {/* Content Section Overlay */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 lg:px-12 -mt-48 pb-20">
          <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
            {/* Poster Card */}
            {posterUrl && (
              <div className="w-48 sm:w-64 lg:w-72 shrink-0 rounded-2xl overflow-hidden border border-[#3F3F46]/60 shadow-2xl bg-[#18181B]">
                <img src={posterUrl} alt={movie.title} className="w-full h-auto object-cover" />
              </div>
            )}

            {/* Movie Info Details */}
            <div className="flex-1 flex flex-col gap-4">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-wider text-[#A1A1AA]">
                {movie.vote_average > 0 && (
                  <span className="flex items-center gap-1 bg-[#18181B] border border-[#3F3F46] text-yellow-400 px-2.5 py-1 rounded-lg">
                    <GoStar size={14} className="fill-current" />
                    <span>{movie.vote_average.toFixed(1)}</span>
                  </span>
                )}
                {releaseYear && (
                  <span className="flex items-center gap-1 bg-[#18181B] border border-[#3F3F46] px-2.5 py-1 rounded-lg">
                    <GoCalendar size={14} />
                    <span>{releaseYear}</span>
                  </span>
                )}
                {movie.runtime > 0 && (
                  <span className="flex items-center gap-1 bg-[#18181B] border border-[#3F3F46] px-2.5 py-1 rounded-lg">
                    <GoClock size={14} />
                    <span>{movie.runtime} min</span>
                  </span>
                )}
                {movie.original_language && (
                  <span className="flex items-center gap-1 bg-[#18181B] border border-[#3F3F46] px-2.5 py-1 rounded-lg uppercase">
                    <GoGlobe size={14} />
                    <span>{movie.original_language}</span>
                  </span>
                )}
              </div>

              {/* Title & Tagline */}
              <div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#FAFAFA] font-sans">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-base sm:text-lg text-[#8B5CF6] font-medium italic mt-1">
                    "{movie.tagline}"
                  </p>
                )}
              </div>

              {/* Genres Pills */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="text-xs font-medium bg-[#27272A] border border-[#3F3F46] text-[#FAFAFA] px-3 py-1 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              )}

              {/* Overview */}
              <div className="mt-2">
                <h3 className="text-sm uppercase tracking-wider font-bold text-[#A1A1AA] mb-1.5">Overview</h3>
                <p className="text-sm sm:text-base text-[#FAFAFA]/90 leading-relaxed font-normal">
                  {movie.overview}
                </p>
              </div>

              {/* Production Companies */}
              {movie.production_companies && movie.production_companies.length > 0 && (
                <div className="mt-2">
                  <h3 className="text-xs uppercase tracking-wider font-semibold text-[#A1A1AA] mb-1.5">Production</h3>
                  <div className="flex flex-wrap gap-3 items-center">
                    {movie.production_companies.slice(0, 4).map((company) => (
                      <span key={company.id} className="text-xs text-[#A1A1AA] bg-[#18181B] border border-[#3F3F46]/50 px-2.5 py-1 rounded-md">
                        {company.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-[#3F3F46]/50">
                <button
                  onClick={() => {
                    if (videoUrl) {
                      navigate("/watch/" + videoUrl);
                    }
                  }}
                  className="bg-[#7C3AED] hover:bg-[#8B5CF6] text-white py-3.5 px-8 rounded-xl text-base font-semibold flex items-center gap-2.5 shadow-lg shadow-[#7C3AED]/30 transition-all active:scale-95 cursor-pointer"
                >
                  <GoPlay size={22} className="fill-current" />
                  <span>Watch Movie</span>
                </button>

                <button
                  onClick={isFavorited ? handleRemoveFavorite : handleAddFavorite}
                  className={`py-3.5 px-6 rounded-xl text-base font-semibold flex items-center gap-2 border transition-all active:scale-95 cursor-pointer ${
                    isFavorited
                      ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                      : "bg-[#27272A] border-[#3F3F46] text-[#FAFAFA] hover:bg-[#3F3F46]"
                  }`}
                >
                  {isFavorited ? (
                    <>
                      <GoCheck size={20} />
                      <span>Saved to Favorites</span>
                    </>
                  ) : (
                    <>
                      <GoPlusCircle size={20} />
                      <span>Add to Favorites</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Recommendations / More Like This */}
          {recommendations && recommendations.length > 0 && (
            <div className="mt-20 pt-10 border-t border-[#3F3F46]/40">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1.5 h-6 bg-gradient-to-b from-[#7C3AED] to-[#8B5CF6] rounded-full" />
                <h3 className="text-2xl font-bold tracking-tight text-[#FAFAFA] font-sans">
                  More Like This
                </h3>
              </div>

              <CarouselLayout>
                <EachUtils
                  of={recommendations}
                  render={(item, index) => (
                    <div
                      className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[220px] shrink-0"
                      key={item.id || index}
                    >
                      <MovieCard data={item} />
                    </div>
                  )}
                />
              </CarouselLayout>
            </div>
          )}
        </div>
      </div>
    </BrowseLayout>
  );
};

export default MovieDetail;
