import React from 'react';

import './cart-item.scss';

import Button from '../../button/Button';
import { ICartProps } from './types';
import { PropsWithChildren } from 'react';

const CartItem = ({
  type = 'default',
  category,
  name,
  price,
  desc,
  photos,
  handleOnClick,
  id,
  count,
}: PropsWithChildren<ICartProps & { handleOnClick?: (id: string) => void; id?: string; count?: number }>) => {
  return (
    <div className={`cart-item cart-item__${type}`}>
      <div className="cart-item__inner">
        <div className="cart-item__images">
          {photos.map((url) => (
            <div key={url} className="cart-item__image" style={{ backgroundImage: 'url(' + url + ')' }}></div>
          ))}
        </div>
        <div className="cart-item__content">
          <div className="cart-item__header">
            <div>
              <span className="cart-item__category">{category}</span>
              <span>&#32;/&#32;</span>
              <h2 className="cart-item__name">{name}</h2>
            </div>
            <Button onClick={() => handleOnClick(id)} type="icon">
              ╳
            </Button>
          </div>
        </div>
        {/* <p className="cart-item__description">{desc}</p> */}
        <div className="cart-item__footer">
          <div className="cart-item__price__wrapper">
            <div className="cart-item__price">{!count ? '' : `${count} x ${price} руб.`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
