import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PokemonList from "./pages/PokemanList";
import LazyLoadPokemonList from "./pages/LazyLoadPokemonList";
import "./App.css";

function App() {
  return (
    <Router>
      <nav>
        <ul className="flexEvenly">
          <li>
            <Link to="/">Pokemon List</Link>
          </li>
          <li>
            <Link to="/lazy">Lazy Load Pokemon List</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" Component={PokemonList} />
        <Route path="/lazy" Component={LazyLoadPokemonList} />
      </Routes>
    </Router>
  );
}

export default App;
