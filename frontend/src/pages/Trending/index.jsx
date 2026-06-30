import React from "react";
import BrowseLayout from "@/components/Layouts/BrowseLayout";
import TrendingJumbotron from "./TrendingJumbotron";
import TrendingList from "./TrendingList";
import { getNowPlayingMovies, getTopRatedNewMovies } from "@/utils/getTrendingMovies";
import Footer from "@/components/Modules/LandingPage/Footer";

const Trending = () => {
  return (
    <BrowseLayout>
      <TrendingJumbotron />
      <TrendingList title="Now Playing (New Movies)" fetchFn={getNowPlayingMovies} />
      <TrendingList title="Top Rated New Releases (2025 - 2026)" fetchFn={getTopRatedNewMovies} />
      <Footer />
    </BrowseLayout>
  );
};

export default Trending;
