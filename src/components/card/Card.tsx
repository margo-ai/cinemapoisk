import React, { PropsWithChildren, memo } from 'react';
import './card.scss';

interface ICardProps {
  categoryName: string;
  name: string;
  price: number;
  oldPrice?: number;
  description: string;
  imageUrl: string;
}

const Card = memo(({ categoryName, name, price, oldPrice, description, imageUrl }: PropsWithChildren<ICardProps>) => {
  console.log('Card', name);

  return (
    <div className="card">
      <div className="card__inner">
        <div className="card-image__wrapper">
          <img src={imageUrl} alt={name} className="card__image" />
        </div>
        <div className="card__content">
          <span className="card__category">{categoryName}</span>
          <h2 className="card__name">{name}</h2>
          <p className="card__description">{description}</p>
          <div className="card__footer">
            <div className="card-price__wrapper">
              <div className="card-price_new">{price} руб.</div>
              {oldPrice ? <div className="card-price_old">{oldPrice} руб.</div> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Card;
