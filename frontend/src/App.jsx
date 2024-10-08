import MovieForm from "./features/movies/MovieForm";
import MovieView from "./features/movies/MovieView";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container my-3">
      <h1>Movie List App</h1>
      <MovieView />
      <MovieForm />
    </div>
  );
}

export default App;
