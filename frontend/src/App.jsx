import MovieForm from "./features/movies/MovieForm";
import MovieView from "./features/movies/MovieView";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieView />} />
        <Route path="/movies" element={<MovieForm />} />
        <Route path="/movies/:movieId" element={<MovieForm />} />
      </Routes>
    </Router>
  );
}

export default App;
