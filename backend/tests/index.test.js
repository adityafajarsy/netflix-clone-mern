require("dotenv").config();
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index.js");

beforeEach(async () => {
  await mongoose.connect(process.env.MONGO_URL);
});

afterEach(async () => {
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
