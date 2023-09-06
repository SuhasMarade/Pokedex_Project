import { useEffect, useState } from "react";
import axios from 'axios';
import './PokemonList.css';
import Pokemon from "../Pokemon/Pokemon";

function PokemonList() {

  const [pokemonList, setPokemonList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pokedexUrl, setPokedexUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  async function downloadPokemon() {

    setIsLoading(true);
    const response = await axios.get(pokedexUrl); // This dowloads list of 20 pokemons

    const pokemonResult = response.data.results; // We get array of pokemons  from result

    console.log(response.data);

    setNextUrl(response.data.next);
    setPrevUrl(response.data.previous);

    //Iterating over the array of pokemon and using their url, to create array of promises
    // that will download those 20 pokemons
    const pokemonResultPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url));

    //passing that promise array to axios.all
    const pokemonData = await axios.all(pokemonResultPromise);
    console.log(pokemonData);


    // now iterate over the data of each pokemon and extract id, name, image, types
    const pokemonListResult = pokemonData.map((pokeData)=>{
      const pokemon = pokeData.data;
      return {
        id:pokemon.id,
        name:pokemon.name, 
        image:(pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default: pokemon.sprites.front_shiny, 
        types: pokemon.types}
    })

    console.log(pokemonListResult);
    setPokemonList(pokemonListResult);
    setIsLoading(false);   
  }

    useEffect(() => {
      downloadPokemon();
    },[pokedexUrl])
    return (
        <>
          <div className="pokemon-list-wrapper">

            <div className="pokemon-wrapper">
              {(isLoading)? 'Loading...': 
              pokemonList.map((p) => <Pokemon name={p.name} image={p.image} key={p.id} id={p.id}/>)}
            </div>
            <div className="controls">
              <button disabled={prevUrl == null} onClick={()=>setPokedexUrl(prevUrl)}>Prev</button>
              <button disabled={nextUrl == null} onClick={()=>setPokedexUrl(nextUrl)}>Next</button>
            </div>
          </div>
        </>
    );
}

export default PokemonList;