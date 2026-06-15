import { axiosInstance } from "./axios";

// export const getVideoUrl = async ({ movie_id }) => {
//   try {
//     const url = await axiosInstance.get(
//       `${import.meta.env.VITE_BASE_URL_TMDB}/movie/${movie_id}/videos`
//     );
//     return url.data.results[0].key;
//   } catch (error) {
//     console.log(error);
//   }
// };
export const getVideoUrl = async ({ movie_id }) => {
  if (!movie_id) {
    console.error("❌ movie_id is missing or null!");
    return null;
  }

  try {
    const res = await axiosInstance.get(
      `${import.meta.env.VITE_BASE_URL_TMDB}/movie/${movie_id}/videos`
    );

    console.log("🎬 Video API response:", res.data);

    const results = res.data?.results;
    if (!results || results.length === 0) {
      console.warn(`⚠️ No videos found for movie_id: ${movie_id}`);
      return null;
    }

    // kalau ada lebih dari 1 video, pilih trailer kalau tersedia
    const trailer = results.find(v => v.type === "Trailer" && v.site === "YouTube");
    return trailer ? trailer.key : results[0].key;

  } catch (error) {
    console.error("🚨 Error fetching video:", error.message);
    return null;
  }
};
