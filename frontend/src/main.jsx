import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Browse from "./pages/Browse";
import Watch from "./pages/Watch";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Favorite from "./pages/Favorite";
import MovieDetail from "./pages/MovieDetail";
import TvSeries from "./pages/TvSeries";
import Genres from "./pages/Genres";
import GenreMovies from "./pages/GenreMovies";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Browse />,
  },
  {
    path: "browse",
    element: <Browse />,
  },
  {
    path: "movie/:id",
    element: <MovieDetail />,
  },
  {
    path: "watch/:id",
    element: <Watch />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/favorite",
    element: <Favorite />,
  },
  {
    path: "/tv-series",
    element: <TvSeries />,
  },
  {
    path: "/tv/:id",
    element: <MovieDetail />,
  },
  {
    path: "/genres",
    element: <Genres />,
  },
  {
    path: "/genre/:genreId",
    element: <GenreMovies />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

