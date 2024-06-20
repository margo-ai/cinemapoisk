export type TGenre = { name: string };

export type TKinopoisk = {
  ageRating: number;
  alternativeName: string | null;
  backdrop: {
    previewUrl: string;
    url: string;
  };
  coutries: string[];
  description: string;
  enName?: null;
  genres: TGenre[];
  id: number;
  isSeries: boolean;
  movieLength: number | null;
  name: string;
  poster: {
    previewUrl: string;
    url: string;
  };
  rating: {
    await: null;
    filmCritics: number;
    imdb: number;
    kp: number;
    russianFilmCritics: number;
  };
  ratingMpaa: null;
  releaseYears?: {
    start: number;
    end: number;
  };
  seriesLength: number | null;
  shortDescription: string;
  status: string | null;
  ticketsOnSale: boolean;
  top10: null;
  top250: null;
  totalSeriesLength: null;
  type: string;
  typeNumber: number;
  votes: { await: number; filmCritics: number; imdb: number; kp: number; russianFilmCritics: number };
  year: number;
};

export type TMovies = {
  id: number;
  name: string;
  alternativeName?: string;
  poster?: string;
  year: number | string;
  rating: number | string;
  description?: string;
  genres?: TGenre[];
};

export type TState = {
  movies: TMovies[];
  currentPage: number;
  pagesCount: number;
  moviesLoadingStatus: string;
  genres: string[];
  selectedMovie: TMovies;
};
