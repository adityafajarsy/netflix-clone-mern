import { axiosInstance } from "./axios";

export const getNowPlayingMovies = async () => {
  try {
    const res = await axiosInstance.get("/movie/now_playing");
    return res.data.results;
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    return [];
  }
};

export const getTopRatedNewMovies = async () => {
  try {
    // Fetch highly rated movies released in 2025 or 2026
    const res = await axiosInstance.get("/discover/movie", {
      params: {
        sort_by: "vote_average.desc",
        "vote_count.gte": 50,
        "primary_release_date.gte": "2025-01-01",
        "primary_release_date.lte": "2026-12-31",
      },
    });
    return res.data.results;
  } catch (error) {
    console.error("Error fetching top rated new movies:", error);
    return [];
  }
};
