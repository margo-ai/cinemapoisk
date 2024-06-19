import { TMovies, TKinopoisk } from "../types/index";
import notFoundImage from "../assets/imagenotfound.jpg";

export const _transformData = (movie: TKinopoisk): TMovies => {
  return {
    id: movie.id,
    name: movie.name ? movie.name : movie.alternativeName,
    alternativeName: movie.alternativeName ? movie.alternativeName : "no alt name",
    poster: movie.poster ? movie.poster.url : null,
    description: movie.description ? movie.description : "no descr",
    genres: movie.genres ? movie.genres : [],
    year: movie.year ? movie.year : "no year",
    rating: movie.rating.kp === 0 ? "0" : movie.rating.kp.toFixed(1),
  };
};

export const checkImageUrl = (imageUrl: string) => {
  return imageUrl ? imageUrl : notFoundImage;
};

export const getGenres = (movies: TMovies[]) => {
  const genresArray: string[] = [];
  for (let i = 0; i < movies.length; i++) {
    movies[i].genres.forEach((genre) => genresArray.push(genre.name));
  }
  const uniqueGenres = new Set(genresArray);
  return Array.from(uniqueGenres);
};
