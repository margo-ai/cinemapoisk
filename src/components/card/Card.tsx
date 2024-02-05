import React, { PropsWithChildren, memo } from 'react';
import './card.scss';
import { ICardProps } from './types';
import ModalWrapper from '../modal-wrapper/ModalWrapper';
import Button from '../button/Button';
import AddEditForm from '../forms/add-edit-form/AddEditForm';

/** Icons */
import { TrashIcon, PencilIcon } from '@heroicons/react/24/solid';
import CartButton from '../cart/cart-button/CartButton';

const Card = memo(
  ({
    type = 'default',
    id,
    category,
    name,
    price,
    desc,
    photo,
    count = 0,
    addToCartHandler,
    updateList,
  }: PropsWithChildren<ICardProps>) => {
    const cardData = {
      id,
      category,
      name,
      price,
      desc,
      photo,
    };

    // console.log('Card', name);
    const handleSetNewCount = (newValue: number) => {
      console.log('Add to cart', id, newValue);
      addToCartHandler(id, newValue);
    };

    // const removeItemHandler = () => {
    //   // GRAPH QL
    // };

    return (
      <div className={`card card--${type}`}>
        <div className="card__inner">
          <div className="card-image__wrapper">
            <img src={photo} alt={name} className="card__image" />
          </div>
          <div className="card__content">
            <span className="card__category">{category.name}</span>
            <h2 className="card__name">{name}</h2>
            <p className="card__description">{desc}</p>
            <div className="card__footer">
              <div className="card__price">{price} руб.</div>
              <div className="card__buttons">
                <div style={{ display: 'flex' }}>
                  <ModalWrapper
                    actionNode={
                      <Button icon>
                        <PencilIcon />
                      </Button>
                    }
                  >
                    {({ hide }) => <AddEditForm cardData={cardData} onSuccessSubmit={hide} />}
                  </ModalWrapper>
                  <Button icon>
                    <TrashIcon />
                  </Button>
                </div>
                <CartButton setNewCount={handleSetNewCount} type="success" count={count}>
                  {'Добавить в корзину'}
                </CartButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
