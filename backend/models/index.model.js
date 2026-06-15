import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: {
    require: true,
    unique: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },

  token: {
    type: String,
  },
  favoriteMovies: Array,
});

export const User = mongoose.model("User", UserSchema);

