import { useState, useEffect } from "react";
import axios from "axios";

const LazyLoadPokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState("");

  useEffect(() => {
    loadPokemon();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const loadPokemon = () => {
    setLoading(true);

    axios
      .get(nextPageUrl || "https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => {
        setPokemonList((prevList) => [...prevList, ...response.data.results]);
        setFilteredPokemon((prevList) => [
          ...prevList,
          ...response.data.results,
        ]);
        setNextPageUrl(response.data.next);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadPokemon();
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filteredResults = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue)
    );
    setFilteredPokemon(filteredResults);
  };

  return (
    <div>
      <h1>Lazy Load Pokemon List</h1>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ol>
        {filteredPokemon.map((pokemon, index) => (
          <li key={index}>{pokemon.name}</li>
        ))}
      </ol>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default LazyLoadPokemonList;
