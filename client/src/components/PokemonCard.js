import React from "react";

const PokemonCard = ({id, name, image, type}) => {

    const style = `card-container ${type}`;

    return (
        <div data-testid="pokemonCardTestId" className={style}>
            <div className="number">
                <small>#0{id}</small>
            </div>
            <img src={image} alt={name}></img>
            <div className="detail-wrapper">
                <h3>{name}</h3>
                <small>Type: {type}</small>
            </div>
        </div>
    )
}

export default PokemonCard