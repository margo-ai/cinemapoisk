import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./singleMoviePage.scss";

import { useAppDispatch, useAppSelector } from "../helpers/hooks";

import Button from "@mui/material/Button";

import { TGenre } from "../types/index";

export const SingleMoviePage = () => {
  const navigate = useNavigate();
  const movieData = useAppSelector((state) => state.movies.selectedMovie);

  const getGenresString = (genres: TGenre[]) => {
    const genresArray: string[] = [];
    for (let i = 0; i < genres.length; i++) {
      genresArray.push(genres[i]["name"]);
    }

    return genresArray.join(", ");
  };

  return (
    <div className="single-movie-page-container">
      <div className="back-button">
        <Button type="button" variant="contained" style={{ width: "200px" }} onClick={() => navigate(-1)}>
          Назад
        </Button>
      </div>
      <div className="movie-wrapper">
        <div className="image">
          <img src={movieData.poster} alt="Movie poster" />
        </div>
        <div className="movie">
          <h1 className="movie__name-and-year">
            {movieData.name} ({movieData.year})
          </h1>
          <p className="movie__description">{movieData.description}</p>
          <div className="movie__genres">Жанр: {getGenresString(movieData.genres)}</div>
          <div className="movie__rating">Рейтинг КП: {movieData.rating}/10</div>
        </div>
      </div>
    </div>
  );
};
