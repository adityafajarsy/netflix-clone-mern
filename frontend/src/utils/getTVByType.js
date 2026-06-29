import { axiosInstance } from "./axios";

export const getTVByType = async ({ tvType }) => {
  try {
    const res = await axiosInstance.get("/tv/" + tvType);
    return res.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
