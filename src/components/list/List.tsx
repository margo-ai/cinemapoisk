import React, { useEffect } from 'react';

import './list.scss';

import { useLazyQuery, useQuery } from '@apollo/client';
import { GET_BOOKS } from '../../graphql/queries/getBooks';

// import { movies as moviesData } from 'src/api/movies';
// import { books as booksData } from 'src/api/books.mjs';

import Card from '../card/Card';
import { useInView } from 'react-intersection-observer';

const List = () => {
  // const { ref, inView } = useInView({
  //   threshold: 0,
  //   trackVisibility: true,
  //   delay: 800,
  // });

  // useEffect(() => {
  //   if (inView) {
  //     load();
  //   }
  // }, [inView]);

  const { data } = useQuery(GET_BOOKS);
  // const [load, { data }] = useLazyQuery(GET_BOOKS);

  console.log({ data });

  const items = data?.products.getMany.data || [];

  return (
    <div className="list">
      <div className="list__wrapper">
        {items.map(({ id, name, photo, desc, price, category }) => (
          <Card key={id} categoryName={category.name} name={name} price={price} desc={desc} photo={photo} />
        ))}
      </div>

      {/* <span ref={ref} className="list__load-more">
        &#8635;
      </span> */}
    </div>
  );
};

export default List;
