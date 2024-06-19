import React from "react";

import "./card.scss";

import image from "../../assets/pic.jpg";
import { TMovies } from "src/types";

export const Card = ({ name, alternativeName, poster, year, rating }: TMovies) => {
  return (
    <li className="card">
      <div className="card__image">
        <img src={poster} alt="Movie image" />
      </div>
      <div className="card__info info">
        <div className="info__title">{name}</div>
        <div className="info__year">{year}</div>
        <div className="info__rating">Рейтинг КП: {rating}/10</div>
      </div>
    </li>
  );
};
