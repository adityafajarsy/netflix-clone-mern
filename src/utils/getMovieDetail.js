// import { axiosInstance } from "./axios";

// export const getMovieDetail = async ({ movie_id }) => {
//   try {
//     let movie = await axiosInstance.get("movie/" + movie_id);
//     return movie.data;
//   } catch (error) {
//     console.log(error);
//   }
// };

import { axiosInstance } from "./axios";

export const getMovieDetail = async ({ movie_id }) => {
  if (!movie_id) {
    console.error("❌ movie_id is missing or null!");
    return null;
  }

  try {
    const res = await axiosInstance.get(`/movie/${movie_id}`);
    console.log("🎬 Movie detail response:", res.data);

    return res.data;
  } catch (error) {
    if (error.response) {
      // error dari server (status code di luar 2xx)
      console.error(
        `🚨 Failed to fetch movie detail (status: ${error.response.status})`,
        error.response.data
      );
    } else if (error.request) {
      // request dikirim tapi gak ada respon
      console.error("🚨 No response from server:", error.request);
    } else {
      // error lain
      console.error("🚨 Error setting up request:", error.message);
    }
    return null;
  }
};
