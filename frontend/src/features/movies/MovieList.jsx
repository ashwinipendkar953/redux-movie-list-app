import { useDispatch } from "react-redux";
import { deleteMovie, fetchMovies } from "./movieSlice";
import { useNavigate } from "react-router-dom";

const MovieList = ({ movies }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

            <div className="d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={() =>
                  navigate(`movies/${movie?._id}`, {
                    state: { movie, isEdit: true },
                  })
                }
              >
                Edit
              </button>
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
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
