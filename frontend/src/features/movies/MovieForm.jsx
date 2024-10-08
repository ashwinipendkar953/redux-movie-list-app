import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie, fetchMovies } from "./movieSlice";
const INITIAL_FORM_DATA = {
  title: "",
  director: "",
  genre: "",
};

const MovieForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.title && formData.director && formData.genre) {
      dispatch(addMovie(formData)).then(() => {
        dispatch(fetchMovies());
      });
    }
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <div>
      <h2>Movie Form</h2>
      <form action="" className="my-3" onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Movie Title:
          </label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={formData?.title || ""}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="director" className="form-label">
            Director:
          </label>
          <input
            type="text"
            name="director"
            id="director"
            className="form-control"
            value={formData?.director || ""}
            onChange={changeHandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label">
            Genre:
          </label>
          <input
            type="text"
            name="genre"
            id="genre"
            className="form-control"
            value={formData?.genre || ""}
            onChange={changeHandler}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
