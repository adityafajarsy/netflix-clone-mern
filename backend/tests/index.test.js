import "dotenv/config";
import mongoose from "mongoose";
import request from "supertest";
import app from "../index.js";
import { User } from "../models/index.model.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  await User.deleteMany({ email: "testing@123.com" });
  await User.create({
    email: "testing@123.com",
    password: "testpassword",
    token: "xxx12332",
    favoriteMovies: []
  });
});

afterAll(async () => {
  await User.deleteMany({ email: "testing@123.com" });
  await mongoose.connection.close();
});

describe("Resource /my-movies", () => {
  it("should return a success message", async () => {
    const response = await request(app).get(
      "/my-movies/testing@123.com/xxx12332"
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Get Favorite Movies Success");
  });

  it("should return unauthorized message", async () => {
    const response = await request(app).get(
      "/my-movies/testing@123.com/123123123123"
    );
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Error, Unauthorized");
  });

  it("should return success to add favorite movies", async () => {
    const response = await request(app)
      .post("/my-movies")
      .set("Content-Type", "application/json")
      .send({
        email: "testing@123.com",
        token: "xxx12332",
        data: {
          id: 1,
          title: "testing",
          description: "test desc",
        },
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.message).toBe("Add Favorite Movies Success");
  });

  it("should return failed to save favorite movies", async () => {
    const response = await request(app)
      .post("/my-movies")
      .set("Content-Type", "application/json")
      .send({
        email: "testing@123.com",
        token: "12312321312",
        data: {
          id: 1,
          title: "testing",
          description: "test desc",
        },
      });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe("Error, Unauthorized");
  });
});
