import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useInView } from 'react-intersection-observer';

import './list.scss';

import { movies as moviesData } from 'src/api/movies';

import Card from '../card/Card';

const List = () => {
  console.log('List rendered');
  const { ref, inView } = useInView({
    threshold: 0,
    trackVisibility: true,
    delay: 800,
  });

  const [movies, setMovies] = useState(moviesData);

  const setMoviesHandle = () => {
    setMovies((prevMovies) => [
      ...prevMovies,
      {
        ...prevMovies[Math.floor(Math.random() * prevMovies.length)],
        id: uuidv4(),
      },
      {
        ...prevMovies[Math.floor(Math.random() * prevMovies.length)],
        id: uuidv4(),
      },
      {
        ...prevMovies[Math.floor(Math.random() * prevMovies.length)],
        id: uuidv4(),
      },
    ]);
  };

  useEffect(() => {
    if (inView) setMoviesHandle();
  }, [inView]);

  return (
    <div className="list">
      <div className="list__wrapper">
        {movies.map(({ categoryName, name, price, description, imageUrl, id }) => (
          <Card
            key={id}
            categoryName={categoryName}
            name={name}
            price={price}
            description={description}
            imageUrl={imageUrl}
          />
        ))}
      </div>

      <span ref={ref} className="list__load-more">
        &#8635;
      </span>
    </div>
  );
};

export default List;
