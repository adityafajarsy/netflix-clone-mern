import { Router } from "express";
import UserController from "../controllers/index.controller.js";
import { checkToken } from "../utils/auth.js";

const router = Router();

router.get(
  "/my-movies/:email/:token",
  checkToken,
  UserController.GetFavoriteMovies
);
router.post("/my-movies", checkToken, UserController.AddFavoriteMovies);
router.delete("/my-movies", checkToken, UserController.RemoveFavoriteMovies);
router.post("/my-movies/check", checkToken, UserController.CheckFavoriteMovies)

// user sign-in token
router.post("/my-token", UserController.SignInToken);

// user sign out
router.delete("/my-token",checkToken, UserController.SignOutToken)

// Sign Up user
router.post("/sign-up", UserController.SignUpUser)

export default router;

