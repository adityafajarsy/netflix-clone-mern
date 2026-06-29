import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Landing from "./pages/Landing/Index.jsx";
import Browse from "./pages/Browse";
import Watch from "./pages/Watch";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Favorite from "./pages/Favorite";

import MovieDetail from "./pages/MovieDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />,
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
    element: <Favorite />
  }
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
