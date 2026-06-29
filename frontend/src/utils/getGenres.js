import { axiosInstance } from "./axios";

export const getGenres = async ({ type = "movie" } = {}) => {
  try {
    const res = await axiosInstance.get(`/genre/${type}/list`);
    return res.data.genres; // [{ id, name }, ...]
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMoviesByGenre = async ({ genreId, page = 1, type = "movie" } = {}) => {
  try {
    const res = await axiosInstance.get(`/discover/${type}`, {
      params: {
        with_genres: genreId,
        page,
        sort_by: "popularity.desc",
      },
    });
    return {
      results: res.data.results,
      totalPages: res.data.total_pages,
      totalResults: res.data.total_results,
    };
  } catch (error) {
    console.error(error);
    return { results: [], totalPages: 0, totalResults: 0 };
  }
};
