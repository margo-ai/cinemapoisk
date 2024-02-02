import React, { PropsWithChildren, memo } from 'react';
import './card.scss';
import { ICardProps } from './types';

const Card = memo(({ categoryName, name, price, desc, photo }: PropsWithChildren<ICardProps>) => {
  // console.log('Card', name);

  return (
    <div className="card">
      <div className="card__inner">
        <div className="card-image__wrapper">
          <img src={photo} alt={name} className="card__image" />
        </div>
        <div className="card__content">
          <span className="card__category">{categoryName}</span>
          <h2 className="card__name">{name}</h2>
          <p className="card__description">{desc}</p>
          <div className="card__footer">
            <div className="card-price__wrapper">
              <div className="card-price_new">{price} руб.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

Card.displayName = 'Card';

export default Card;
