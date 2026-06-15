import { axiosInstance } from "./axios";

export const getMoviesByType = async ({ moviesType }) => {
  try {
    let movies = await axiosInstance.get("/movie/" + moviesType);
    return movies.data.results;
  } catch (error) {
    console.log(error);
  }
};
