const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const { INITIALIZE_DB } = require("./db/conn.js");
const { Movies } = require("./models/movieModel.js");

INITIALIZE_DB();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, Express");
});

app.get("/movies", async (req, res) => {
  try {
    const movies = await Movies.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internam server error." });
  }
});

app.post("/movies", async (req, res) => {
  const { title, director, genre } = req.body;
  try {
    const newMovie = new Movies({ title, director, genre });
    const saveMovie = await newMovie.save();
    res.status(200).json(saveMovie);
  } catch (error) {
    res.status(500).json({ eror: "Internal server error." });
  }
});

app.delete("/movies/:id", async (req, res) => {
  const movieId = req.params.id;
  try {
    const deletedMovie = await Movies.findByIdAndDelete(movieId);
    if (!deletedMovie) {
      res.status(404).json({ error: "Movie not found." });
    }
    res.status(200).json({
      message: "Movie deleted sucessfully.",
      movie: deletedMovie,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
