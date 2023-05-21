import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./pages/PokemanList";
import LazyLoadPokemonList from "./pages/LazyLoadPokemonList";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={PokemonList} />
        <Route path="/lazy" Component={LazyLoadPokemonList} />
      </Routes>
    </Router>
  );
}

export default App;
