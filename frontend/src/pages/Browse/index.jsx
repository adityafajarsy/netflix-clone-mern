import React from "react";
import BrowseLayout from "@layouts/BrowseLayout";
import Jumbotron from "@mods/BrowsePage/Jumbotron";
import MovieList from "@mods/BrowsePage/MovieList";
import Modal from "@mods/BrowsePage/Modal";
import SearchMovies from "@mods/BrowsePage/SearchMovies";
import { useAtom } from "jotai";
import { searchMoviesAtom } from "@/jotai/atoms";
import Footer from "@/components/Modules/LandingPage/Footer";

const Browse = () => {
  const [searchQuery] = useAtom(searchMoviesAtom)


  return (
    <BrowseLayout>
    {searchQuery ? <SearchMovies/> : (
      <>
      <Jumbotron />
      <MovieList title="Now Playing" moviesType={"now_playing"}/>
      <MovieList title="Popular Movies" moviesType={"popular"}/>
      <MovieList title="Top Rated" moviesType={"top_rated"}/>
      <MovieList title="Upcoming" moviesType={"upcoming"}/>
      </>
    )}
    <Footer/>
      <Modal />
    </BrowseLayout>
  );
};

export default Browse;
