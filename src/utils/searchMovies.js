import { axiosInstance } from "./axios";

export const searchMovies = async ({ query }) => {
  try {
    const movies = await axiosInstance.get("search/movie?query=" + query);
    return movies.data.results;
  } catch (error) {
    console.log(error);
  }
};
