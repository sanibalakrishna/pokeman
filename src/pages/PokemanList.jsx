/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { MdArrowBackIosNew, MdArrowForwardIos } from "react-icons/md";
import axios from "axios";

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonPerPage] = useState(10);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=1000")
      .then((response) => {
        setPokemonList(response.data.results);
        setFilteredPokemon(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);

    const filteredResults = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchValue)
    );
    setFilteredPokemon(filteredResults);
  };

  // Pagination
  const indexOfLastPokemon = currentPage * pokemonPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonPerPage;
  const currentPokemon = filteredPokemon.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <h1>Pokemon List</h1>
      <input
        type="text"
        placeholder="Search Pokemon..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <ol>
        {currentPokemon.map((pokemon, index) => (
          <div key={index} className="flexBetween">
            <p>{(currentPage - 1) * 10 + index + 1}</p>
            <p>{pokemon.name}</p>
          </div>
        ))}
      </ol>
      <Pagination
        pokemonPerPage={pokemonPerPage}
        totalPokemon={filteredPokemon.length}
        paginate={paginate}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const Pagination = ({
  pokemonPerPage,
  totalPokemon,
  paginate,
  setCurrentPage,
}) => {
  const pageNumbers = [];
  const [presentPage, setPresentPage] = useState(1);

  const Increment = (value) => {
    if (presentPage != Math.ceil(totalPokemon / pokemonPerPage)) {
      setPresentPage(value);
      setCurrentPage(value);
      paginate(value);
    }
  };
  const Decrement = (value) => {
    if (presentPage > 1) {
      setPresentPage(value);
      setCurrentPage(value);
      paginate(value);
    }
  };

  const handleLast = () => {
    setPresentPage(Math.ceil(totalPokemon / pokemonPerPage));
    setCurrentPage(Math.ceil(totalPokemon / pokemonPerPage));
    paginate(Math.ceil(totalPokemon / pokemonPerPage));
  };
  for (let i = 1; i <= Math.ceil(totalPokemon / pokemonPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <div className="pagination">
        <div className="page-item">
          <button
            onClick={() => Decrement(presentPage - 1)}
            className="page-link"
          >
            <MdArrowBackIosNew />
          </button>
        </div>

        <div className="page-item">
          <button onClick={() => paginate(presentPage)} className="page-link">
            {presentPage}
          </button>
        </div>
        {presentPage + 1 <= Math.ceil(totalPokemon / pokemonPerPage) && (
          <div className="page-item">
            <button
              onClick={() => paginate(presentPage + 1)}
              className="page-link"
            >
              {presentPage + 1}
            </button>
          </div>
        )}
        {presentPage + 2 <= Math.ceil(totalPokemon / pokemonPerPage) && (
          <div className="page-item">
            <button
              onClick={() => paginate(presentPage + 2)}
              className="page-link"
            >
              {presentPage + 2}
            </button>
          </div>
        )}
        <p>...</p>
        <div className="page-item">
          <button
            onClick={() => handleLast(Math.ceil(totalPokemon / pokemonPerPage))}
            className="page-link"
          >
            {Math.ceil(totalPokemon / pokemonPerPage)}
          </button>
        </div>

        <div className="page-item">
          <button
            onClick={() => Increment(presentPage + 1)}
            className="page-link"
          >
            <MdArrowForwardIos />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PokemonList;
