import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./movieSlice";
import MovieList from "./MovieList";
import { useNavigate } from "react-router-dom";

const MovieView = () => {
  const dispatch = useDispatch();
  const { status, error, movies } = useSelector((state) => state.movies);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div className="container my-3">
      <div className="d-flex gap-2">
        <h1>Movie List App</h1>
        <button className="btn btn-primary" onClick={() => navigate("/movies")}>
          Add Movie
        </button>
      </div>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div className="text-danger fw-bold">{error}</div>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MovieView;
