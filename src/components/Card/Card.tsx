import React from "react";
import { Link } from "react-router-dom";

import "./card.scss";

import { TMovies } from "src/types";

import { useAppDispatch, useAppSelector } from "../../helpers/hooks";
import { setSelectedMovie } from "src/reducers/moviesSlice";

export const Card = ({ id, name, alternativeName, poster, year, rating }: TMovies) => {
  const dispatch = useAppDispatch();
  const movies = useAppSelector((state) => state.movies.movies);

  const handleMovie = (movieId: number) => {
    const movie = movies.find((item) => item.id === movieId);
    dispatch(setSelectedMovie(movie));
  };

  return (
    <li key={id} className="card">
      <Link to={`/${id}`} onClick={() => handleMovie(id)}>
        <div className="card__image">
          <img src={poster} alt="Movie image" />
        </div>
        <div className="card__info info">
          <div className="info__title">{name}</div>
          <div className="info__year">{year}</div>
          <div className="info__rating">Рейтинг КП: {rating}/10</div>
        </div>
      </Link>
    </li>
  );
};
