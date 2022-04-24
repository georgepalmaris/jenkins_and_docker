import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './app.css';

// Components
import PokemonCard from './components/PokemonCard';

function App() {
    const [allPokemon, setAllPokemon] = useState([]);
    const [offset, setOffset] = useState(0);
    const [limit, setLimit] = useState(20);
    
    const getAllPokemon = async () => {
        // Make a request to our express backend
        axios.get(process.env.REACT_APP_API_URI + '/getallpokemon', {
            params: 
            {
                offset: offset,
                limit: limit
            }  
        })
        .then(response => {
            response.data.results.forEach((pokemon) => {
                createPokemonObject(pokemon)
            })
        });
    };

    function createPokemonObject(pokemon) {
        // Make a request to our express backend
        axios.get(process.env.REACT_APP_API_URI + '/getpokemon', {
            params: 
            {
                name: pokemon.name
            }  
        })
        .then(response => {
            setAllPokemon(currentList => [...currentList, response.data]);
        });
    }

    // Combination of lifecycle hooks to keep components reactive
    useEffect(() => {getAllPokemon()}, [])

    return (
        // Render the apps components
        <div className="app-container">
            <h1>Pokemon List</h1>
            <div className="pokemon-container">
                <div className="all-container">
                    { allPokemon.map((pokemon, index) => {
                        return <PokemonCard 
                        id={pokemon.id}
                        name={pokemon.name} 
                        image={pokemon.sprites.other.dream_world.front_default} 
                        type={pokemon.types[0].type.name} 
                        key={index}
                        ></PokemonCard>
                    })}
                </div>
                <button className="load-more" onClick={() => { setOffset(offset + 20); getAllPokemon(); }}>Load more</button>
            </div>
        </div>
    );
}

export default App;
