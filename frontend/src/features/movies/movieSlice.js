import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  try {
    const response = await axios.get(`${apiUrl}/movies`);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const addMovie = createAsyncThunk("movies/add", async (movieData) => {
  try {
    const response = await axios.post(`${apiUrl}/movies`, movieData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
});

export const deleteMovie = createAsyncThunk(
  "movies/delete",
  async (movieId) => {
    try {
      const response = await axios.delete(`${apiUrl}/movies/${movieId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const editMovie = createAsyncThunk(
  "movies/edit",
  async (movieToUpdate) => {
    try {
      const response = await axios.post(
        `${apiUrl}/movies/${movieToUpdate?._id}`,
        movieToUpdate
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "success";
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "error";
        state.error = action?.error.message;
      })
      .addCase(addMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addMovie.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.status = "error";
        state.error = action?.error.message;
      })
      .addCase(deleteMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMovie.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(deleteMovie.rejected, (state, action) => {
        state.status = "error";
        state.error = action?.error.message;
      })
      .addCase(editMovie.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editMovie.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(editMovie.rejected, (state, action) => {
        state.status = "error";
        state.error = action?.error.message;
      });
  },
});

export const movieReducer = movieSlice.reducer;
