import React from "react";
import BrowseLayout from "@/components/Layouts/BrowseLayout";
import TVJumbotron from "@/components/Modules/TVPage/TVJumbotron";
import TVList from "@/components/Modules/TVPage/TVList";
import Footer from "@/components/Modules/LandingPage/Footer";

const TvSeries = () => {
  return (
    <BrowseLayout>
      <TVJumbotron />
      <TVList title="Popular Now" tvType="popular" />
      <TVList title="Top Rated" tvType="top_rated" />
      <TVList title="On The Air" tvType="on_the_air" />
      <TVList title="Airing Today" tvType="airing_today" />
      <Footer />
    </BrowseLayout>
  );
};

export default TvSeries;
