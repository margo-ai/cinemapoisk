import React, { useEffect, useState } from "react";

import { Container } from "./components/ui/Container";
import { Header } from "./components/Header";
import { List } from "./components/List";
import { Card } from "./components/Card";

import { useAppDispatch, useAppSelector } from "./helpers/hooks";
import { fetchMovies } from "./reducers/moviesSlice";

import { _transformData, checkImageUrl } from "./utils/utils";
import { CircularProgress } from "@mui/material";
import Slider from "@mui/material/Slider";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";

export const App = () => {
  const dispatch = useAppDispatch();

  // const currentPage = useAppSelector((state) => state.movies.currentPage);
  // const pagesCount = useAppSelector((state) => state.movies.pagesCount);
  const movies = useAppSelector((state) => state.movies.movies);
  const moviesLoadingStatus = useAppSelector((state) => state.movies.moviesLoadingStatus);
  const genres = useAppSelector((state) => state.movies.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [ratingValue, setRatingValue] = useState([0, 10]);
  const [yearValue, setYearValue] = useState([1990, 2024]);
  const [genresValue, setGenresValue] = useState([]);

  useEffect(() => {
    dispatch(fetchMovies({ page: currentPage, rating: ratingValue, genresString: "" }));
  }, [currentPage]);
  console.log(genres);

  console.log(ratingValue);
  console.log(yearValue);
  console.log(genresValue);

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
    setGenresValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    );
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    let genresString = "";
    if (genresValue.length === 0) {
      genresString = "";
    } else {
      for (let i = 0; i < genresValue.length; i++) {
        console.log(genresValue[i]);
        genresString += `&genres.name=%2B${genresValue[i]}`;
      }
    }
    console.log(genresString);

    dispatch(fetchMovies({ page: currentPage, rating: ratingValue, genresString: genresString }));
  };

  const onReset = () => {
    setCurrentPage(1);
    setRatingValue([0, 10]);
    setYearValue([1990, 2024]);
    setGenresValue([]);
    dispatch(fetchMovies({ page: 1, rating: [0, 10], genresString: "" }));
  };

  return (
    <Container>
      <Header>Cinemapoisk</Header>
      <main>
        <form onSubmit={handleSubmit} style={{ width: "300px", display: "flex", flexDirection: "column", gap: "25px" }}>
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

          <Button type="submit" variant="contained">
            Найти
          </Button>
          <Button type="button" onClick={onReset}>
            Сбросить фильтры
          </Button>
        </form>

        {moviesLoadingStatus === "loading" ? (
          <CircularProgress size={50} />
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
        ) : null}
      </main>
    </Container>
  );
};
