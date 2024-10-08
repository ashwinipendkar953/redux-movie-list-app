import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovies } from "./movieSlice";
import MovieList from "./MovieList";

const MovieView = () => {
  const dispatch = useDispatch();
  const { status, error, movies } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchMovies());
  }, [dispatch]);

  return (
    <div>
      {status === "loading" && <div>Loading...</div>}
      {status === "error" && <div className="text-danger fw-bold">{error}</div>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MovieView;
