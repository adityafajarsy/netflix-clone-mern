const { ERR, OK } = require("../utils/response");
const { User } = require("../models/index.model");
const argon2 = require("argon2");

const GetFavoriteMovies = async (req, res) => {
  return OK(res, 200, req.user, "Get Favorite Movies Success");
};

const AddFavoriteMovies = async (req, res) => {
  try {
    // tangkap data film dari client
    const { data } = req.body;

    // ambil model mongoose
    const user = await User.findById(req.user._id);

    // menentukan key yang mau diupdate
    user.favoriteMovies.push(data);

    // action untuk update insert data
    await user.save();
    return OK(res, 201, user.favoriteMovies, "Add Favorite Movies Success");
  } catch (error) {
    return ERR(res, 500, "Error 404 Add Movies");
  }
};

const RemoveFavoriteMovies = async (req, res) => {
  try {
    // tangkap movie id dari client
    const { movieID } = req.body;

    // ambil model dari mongodb
    const user = await User.findById(req.user._id);

    // pengecekan ada ngga movie id nya di database? kalo ngga ada "MOvie not Found"
    const existingMovie = user.favoriteMovies.some(
      (movie) => movie.id == movieID
    );

    if (!existingMovie) {
      return ERR(res, 404, "Movie Not Found");
    }

    // Filter id movie yang dikirim client dengan database, dibuang, sisanya disimpen
    user.favoriteMovies = user.favoriteMovies.filter(
      (movie) => movie.id !== movieID
    );

    // save dan jadilah
    await user.save();

    return OK(res, 204, null, "Removing Favorite Movies Success");
  } catch (error) {
    return ERR(res, 500, "Error Removing Movies");
  }
};

const CheckFavoriteMovies = async (req, res) => {
  const { movieID } = req.body;
  try {
    const user = await User.findById(req.user._id);
    const isFavorited = await user.favoriteMovies.some(
      (movie) => movie.id === movieID
    );
    return OK(res, 200, { isFavorited }, "Check Favorite Movie By ID Success");
  } catch (error) {
    return ERR(res, 500, "Error Checking Favorite Movies ID");
  }
};

const SignInToken = async (req, res) => {
  try {
    const { email, password, token } = req.body;
    let user = await User.findOne({ email });

    if (!user) {
      return ERR(res, 400, "User not Found!");
    }

    const isPasswordOK = await argon2.verify(user.password, password);

    if (!isPasswordOK) {
      return ERR(res, 400, "Password Isn't Correct!");
    }

    user.token = token;

    await user.save();

    return OK(res, 200, null, "Sign In Token Saved");
  } catch (error) {
    return ERR(res, 500, "Error Sign In Token");
  }
};

const SignOutToken = async (req, res) => {
  const user = await User.findById(req.user._id);
  user.token = null;

  await user.save();
  return OK(res, 204, null, "Sign-Out Success!");
};

const SignUpUser = async (req, res) => {
  const { email, password } = req.body;
  const hassPass = await argon2.hash(password);

  try {
    const user = await User.findOne({ email });
    if (user) {
      return ERR(res, 400, "Email not available");
    }

    const addNewUser = new User({ email, password: hassPass });
    await addNewUser.save();
    return OK(res, 201, addNewUser._id, "Sign-Up Success!");
  } catch (error) {
    console.log("error: ", error);
    return ERR(res, 500, "Sign Up Failed");
  }
};

module.exports = {
  GetFavoriteMovies,
  AddFavoriteMovies,
  RemoveFavoriteMovies,
  SignInToken,
  SignOutToken,
  SignUpUser,
  CheckFavoriteMovies
};
