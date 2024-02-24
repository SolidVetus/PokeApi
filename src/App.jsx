import { useEffect, useState, useCallback, useRef } from "react";
import "./App.css";

function App() {
  const [pokemonName, setPokemonName] = useState("ditto");
  const [queryString, setQueryString] = useState(pokemonName);
  const [spriteSrc, setSpriteSrc] = useState();
  const [isError, setError] = useState(false);
  const [outputName, setOutputName] = useState("");
  const input = useRef(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${queryString.toLowerCase()}`)
      .then((response) => response.json())
      .then((json) => {
        setSpriteSrc(json.sprites.front_default);
        return json;
      })
      .then(({ name }) => setOutputName(name))
      .catch(() => setError(true));
  }, [queryString]);

  const getPokemon = useCallback(
    (stringName = pokemonName) => {
      setError(false);
      setQueryString(stringName);
      input.current.value = "";
    },
    [pokemonName]
  );

  return (
    <div>
      <img alt="PokéAPI" src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png" style={{display: "block", margin: "20px auto"}}/>
      <button onClick={() => getPokemon("charmander")}>Charmander</button>
      <button onClick={() => getPokemon("charmeleon")}>Charmeleon</button>
      <button onClick={() => getPokemon("charizard")}>Charizard</button>
      <br></br>
      <h2>Enter Pokemon name:</h2>
      <input
        type="text"
        onKeyDown={(event) => {
          if (pokemonName.length && event.key === "Enter") {
            getPokemon();
          }
        }}
        onChange={(event) => {
          setPokemonName(event.target.value);
        }}
        ref={input}
        placeholder="Example: Pikachu"
      />
      <br />
      <button onClick={() => getPokemon()}>Fetch Pokemon</button>
      <br></br>
      {isError ? (
        <span style={{ color: "red" }}>No such Pokemon</span>
      ) : (
        <div>
          <h3>
            Selected:{" "}
            {outputName[0]?.toUpperCase() +
              outputName.slice(1)?.toLowerCase() || ""}
          </h3>
          <img src={spriteSrc} alt={outputName}/>
        </div>
      )}
    </div>
  );
}

export default App;
