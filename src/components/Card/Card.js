import React from "react";

import "./Card.css";

const Card = ({ pokemon }) => {
  return (
    <div className="card">
      <div className="cardImg">
        <img src={pokemon.sprites.front_default}></img>
        <h3 className="cardName">{pokemon.name}</h3>
        <div>porkを作成する</div>
        {pokemon.types.map((type) => {
          return (
            <div key={type.type.name}>
              <span className="typeName">{type.type.name}</span>
            </div>
          );
        })}
      </div>
      <div className="cardInfo">
        <div className="cardData">
          <span>pokepoke</span>
          <p className="title">重さ:{pokemon.weight}</p>
          <p className="title">ウェイト:{pokemon.weight}</p>
        </div>
        <div className="cardData">
          <p className="title">高さ:{pokemon.height}</p>
          <p className="title">height:{pokemon.height}</p>
        </div>
        <div className="cardData">
          <p className="title">あびあび:{pokemon.abilities[0].ability.name}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
