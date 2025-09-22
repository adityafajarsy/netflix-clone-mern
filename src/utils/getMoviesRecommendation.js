import { axiosInstance } from "./axios";

export const getMoviesRecommendation = async ({ movie_id }) => {
  try {
    const movies = await axiosInstance.get(
      "movie/" + movie_id + "/recommendations"
    );
    return movies.data.results;
  } catch (error) {
    console.log(error);
  }
};
