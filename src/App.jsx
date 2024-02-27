import { useEffect, useCallback, useRef, useReducer } from "react";
import "./App.css";
import Reducer from "./Reducer";

function App() {
  const input = useRef(null);
  const [state, dispatch] = useReducer(Reducer, {
    pokemonName: "ditto",
    queryString: "ditto",
    spriteSrc: null,
    isError: false,
    outputName: "",
  });

  useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/${state.queryString.toLowerCase()}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "setSpriteSrc", payload: json.sprites.front_default });
        return json;
      })
      .then(({ name }) => dispatch({ type: "setOutputName", payload: name }))
      .catch(() => dispatch({ type: "setError", payload: true }));
  }, [state.queryString]);

  const getPokemon = useCallback(
    (stringName = state.pokemonName) => {
      dispatch({ type: "setError", payload: false });
      dispatch({ type: "setQueryString", payload: stringName });
      input.current.value = "";
    },
    [state.pokemonName]
  );

  return (
    <div>
      <img
        alt="PokéAPI"
        src="https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png"
        style={{ display: "block", margin: "20px auto" }}
      />
      <button onClick={() => getPokemon("charmander")}>Charmander</button>
      <button onClick={() => getPokemon("charmeleon")}>Charmeleon</button>
      <button onClick={() => getPokemon("charizard")}>Charizard</button>
      <br></br>
      <h2>Enter Pokemon name:</h2>
      <input
        type="text"
        onKeyDown={(event) => {
          if (state.pokemonName.length && event.key === "Enter") {
            getPokemon();
          }
        }}
        onChange={(event) => {
          dispatch({ type: "InputChange", payload: event.target.value });
        }}
        ref={input}
        placeholder="Example: Pikachu"
      />
      <br />
      <button onClick={() => getPokemon()}>Fetch Pokemon</button>
      <br></br>
      {state.isError ? (
        <span style={{ color: "red" }}>No such Pokemon</span>
      ) : (
        <div>
          <h3>
            Selected:{" "}
            {state.outputName[0]?.toUpperCase() +
              state.outputName.slice(1)?.toLowerCase() || ""}
          </h3>
          <img src={state.spriteSrc} alt={state.outputName} />
        </div>
      )}
    </div>
  );
}

export default App;
