//
// This server will be started by Protractor in end-to-end tests.
// Add your API mocks for your specific project in this file.
//
const { on } = require("events");
const express = require("express");
const port = 3000;

let app = express();
let routes = require("express").Router();

// Global mock objects
const mockUserData = {
  name: { firstName: "Firstname", lastName: "Lastname" },
  emailAdress: "first.last@avans.nl",
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1NzUwMjIzNjQsImlhdCI6MTU3NDE1ODM2NCwic3ViIjp7ImVtYWlsIjoiYWRtaW5AYXZhbnMubmwiLCJpZCI6IjVkYzlhY2Y3NmUzOTVhMTY1ODkwMjk2MiJ9fQ.qRPy-lTPIopAJPrarJYZkxK0suUJF_XZ9szeTtie4nc",
};

const mockMovies = [
  {
    _id: "61950e163526e4c9533dd4f5",
    user: {
      name: { firstName: "TestUser", lastName: "Een" },
      _id: "6196cc90ec09fe8b7284eec7",
    },
    ageCategory: "adults",
    genre: [],
    inTheatres: false,
    studio: { _id: "619421734244f7cab8566f71", name: "Paramount Pictures" },
    releaseYear: 1982,
    name: "Testmovie 1",
    __v: 0,
  },
  {
    _id: "61950ff63526e4c9533dd50e",
    user: {
      name: { firstName: "TestUser", lastName: "Een" },
      _id: "6196cc90ec09fe8b7284eec7",
    },
    ageCategory: "all",
    genre: [],
    inTheatres: false,
    studio: { _id: "6194213f4244f7cab8566f6b", name: "Pixar" },
    releaseYear: 2003,
    name: "Testmovie 2",
    __v: 0,
  },
  {
    _id: "619bde033b174a700c923e11",
    user: {
      name: { firstName: "TestUser", lastName: "Twee" },
      _id: "619bdb5e3b174a700c923de8",
    },
    ageCategory: "all",
    genre: [],
    inTheatres: false,
    studio: { _id: "619bdc493b174a700c923e05", name: "Gibli" },
    releaseYear: 2004,
    name: "Testmovie 3",
    __v: 0,
  },
];

const mockStudios = [
  {
    _id: "6194213f4244f7cab8566f6b",
    name: "Pixar",
  },
  {
    _id: "6194214c4244f7cab8566f6d",
    name: "MGM",
  },
];

// Add CORS headers so our external Angular app is allowed to connect
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

routes.post("/api/auth/login", (req, res, next) => {
  res.status(200).json(mockUserData);
});

routes.get("/api/movies", (req, res, next) => {
  res.status(200).json(mockMovies);
});

routes.get("/api/studios", (req, res, next) => {
  res.status(200).json(mockStudios);
});

//
// Write your own mocking API endpoints here.
//

// Finally add your routes to the app
app.use(routes);

app.use("*", function (req, res, next) {
  next({ error: "Non-existing endpoint" });
});

app.use((err, req, res, next) => {
  res.status(400).json(err);
});

app.listen(port, () => {
  console.log("Mock backend server running on port", port);
});

process.on("uncaughtException", (err) => {
  console.log("There was an uncaught error", err);
  process.exit(1); //mandatory (as per the Node.js docs)
});
