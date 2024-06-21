import React, { useState, useEffect } from "react";

import { List } from "../components/List";
import { Card } from "../components/Card";

import { useAppDispatch, useAppSelector } from "../helpers/hooks";
import { _transformData, checkImageUrl } from "../utils/utils";
import { fetchMovies } from "../reducers/moviesSlice";

import { CircularProgress } from "@mui/material";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import "./mainPage.scss";

const getStringGenres = (array: string[]) => {
  let genresString = "";
  if (array.length === 0) {
    genresString = "";
  } else {
    for (let i = 0; i < array.length; i++) {
      genresString += `&genres.name=%2B${array[i]}`;
    }
  }
  return genresString;
};

export const MainPage = () => {
  const dispatch = useAppDispatch();

  const movies = useAppSelector((state) => state.movies.movies);
  const moviesLoadingStatus = useAppSelector((state) => state.movies.moviesLoadingStatus);
  const genres = useAppSelector((state) => state.movies.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [ratingValue, setRatingValue] = useState([0, 10]);
  const [yearValue, setYearValue] = useState([1990, 2024]);
  const [genresValue, setGenresValue] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    dispatch(
      fetchMovies({
        page: currentPage,
        rating: ratingValue,
        years: yearValue,
        genresString: getStringGenres(genresValue),
        searchName: searchName.replace(/ /g, "%20"),
      }),
    );
  }, [currentPage]);

  const ratingValueText = (value: number) => {
    return `Оценка ${value}`;
  };

  const yearValueText = (value: number) => {
    return `Год выхода ${value}`;
  };

  const handleChangeRating = (event: Event, newValue: number | number[]) => {
    setRatingValue(newValue as number[]);
  };

  const handleChangeYear = (event: Event, newValue: number | number[]) => {
    setYearValue(newValue as number[]);
  };

  const handleChangeGenre = (event: SelectChangeEvent<typeof genres>) => {
    const {
      target: { value },
    } = event;
    setGenresValue(typeof value === "string" ? value.split(",") : value);
  };

  const handleSubmitFilters = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    dispatch(
      fetchMovies({
        page: currentPage,
        rating: ratingValue,
        years: yearValue,
        genresString: getStringGenres(genresValue),
      }),
    );
  };

  const handleSubmitSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(fetchMovies({ page: currentPage, searchName: searchName.replace(/ /g, "%20") }));
  };

  const onResetFilters = () => {
    setCurrentPage(1);
    setRatingValue([0, 10]);
    setYearValue([1990, 2024]);
    setGenresValue([]);
    dispatch(fetchMovies({ page: 1, rating: [0, 10], years: [1990, 2024], genresString: "" }));
  };

  const onResetSearch = () => {
    setSearchName("");

    dispatch(
      fetchMovies({
        page: currentPage,
        rating: ratingValue,
        years: yearValue,
        genresString: getStringGenres(genresValue),
        searchName: "",
      }),
    );
  };

  return (
    <div className="main-page-wrapper">
      <div style={{ padding: "10px 20px" }}>
        <div className="forms">
          <form className="forms__filter-form" onSubmit={handleSubmitFilters}>
            <FormControl>
              <InputLabel id="rating-range">Рейтинг:</InputLabel>
              <Slider
                value={ratingValue}
                getAriaValueText={ratingValueText}
                onChange={handleChangeRating}
                max={10}
                valueLabelDisplay="auto"
                aria-labelledby="rating-range"
              />
            </FormControl>

            <FormControl>
              <InputLabel id="year-range">Год выхода:</InputLabel>
              <Slider
                value={yearValue}
                getAriaValueText={yearValueText}
                onChange={handleChangeYear}
                min={1990}
                max={2024}
                valueLabelDisplay="auto"
                aria-labelledby="year-range"
              />
            </FormControl>

            <FormControl>
              <InputLabel id="genres-select">Жанры:</InputLabel>
              <Select
                labelId="genres-select"
                multiple
                value={genresValue}
                onChange={handleChangeGenre}
                input={<OutlinedInput label="Жанры:" />}
              >
                {genres.map((genre) => (
                  <MenuItem key={genre} value={genre}>
                    {genre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <div className="buttons-block">
              <Button type="submit" variant="contained">
                Применить
              </Button>
              <Button type="button" onClick={onResetFilters}>
                Сбросить фильтры
              </Button>
            </div>
          </form>
          <form className="forms__search-form" onSubmit={handleSubmitSearch}>
            <TextField
              label="Название фильма"
              variant="outlined"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Button type="submit" variant="contained">
              Найти
            </Button>
            <Button type="button" onClick={onResetSearch}>
              Очистить
            </Button>
          </form>
        </div>
      </div>

      {moviesLoadingStatus === "loading" ? (
        <CircularProgress size={80} style={{ margin: "20px auto" }} />
      ) : moviesLoadingStatus === "error" ? (
        "error"
      ) : movies.length != 0 ? (
        <List currentPage={currentPage} setCurrentPage={setCurrentPage}>
          {movies?.map((movie) => {
            return (
              <Card
                key={movie.id}
                id={movie.id}
                name={movie.name}
                poster={checkImageUrl(movie.poster)}
                rating={movie.rating}
                year={movie.year}
              />
            );
          })}
        </List>
      ) : (
        "Не найдено ни одного фильма"
      )}
    </div>
  );
};
