import { useDispatch } from "react-redux";
import { deleteMovie, fetchMovies } from "./movieSlice";

const MovieList = ({ movies }) => {
  const dispatch = useDispatch();
  return (
    <div className="container">
      {movies?.map((movie) => {
        return (
          <div
            key={movie?._id}
            className="border border-2 my-3 py-2 px-5 d-flex justify-content-between align-items-center"
          >
            <div>
              <p className=" mb-0">Title: {movie?.title}</p>
              <p className="mb-0">Director: {movie?.director}</p>
              <p className="mb-0">Genre: {movie?.genre}</p>
            </div>

            <button
              className="btn btn-danger "
              onClick={() => {
                dispatch(deleteMovie(movie?._id)).then(() => {
                  dispatch(fetchMovies());
                });
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
