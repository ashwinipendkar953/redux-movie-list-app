import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addMovie, editMovie, fetchMovies } from "./movieSlice";
import { useLocation, useNavigate } from "react-router-dom";
const INITIAL_FORM_DATA = {
  title: "",
  director: "",
  genre: "",
};

const MovieForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { movie = {}, isEdit = false } = state || {};

  useEffect(() => {
    if (isEdit) {
      setFormData({
        title: movie.title,
        director: movie.director,
        genre: movie.genre,
      });
    } else {
      setFormData(INITIAL_FORM_DATA);
    }
  }, [state]);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newFormData = isEdit ? { _id: movie?._id, ...formData } : formData;
    // console.log(newFormData);

    if (isEdit) {
      dispatch(editMovie(newFormData)).then(() => {
        navigate("/");
      });
    } else {
      dispatch(addMovie(formData)).then(() => {
        navigate("/");
      });
    }
    setFormData(INITIAL_FORM_DATA);
  };

  return (
    <div className="container my-3">
      <h1>{isEdit ? "Edit Movie Form" : "Movie Form"}</h1>
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
          {isEdit ? "Edit" : "Submit"}
        </button>
        <button className="btn btn-primary ms-2" onClick={() => navigate("/")}>
          Go Back
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
