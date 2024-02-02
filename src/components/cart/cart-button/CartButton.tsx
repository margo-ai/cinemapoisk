import React, { PropsWithChildren, useState } from 'react';

import './cart-button.scss';

// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';

import { ICartButtonProps, TAction } from './types';
import Button from '../../button/Button';

const CartButton = ({
  type = 'primary',
  size = 'medium',
  icon = false,
  count = 0,
  children = 'В корзину',
  setNewCount,
}: PropsWithChildren<ICartButtonProps>) => {
  const [value, setValue] = useState(count);

  const setNewValue = (newValue: number) => {
    setValue(newValue);
    if (typeof setNewCount === 'function') setNewCount(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setNewValue(value ? value : 0);
  };

  const handleOnClick = (type: TAction) => {
    let newValue = value;
    switch (type) {
      case 'increase':
        newValue = value + 1;
        break;
      case 'decrease':
        newValue = value - 1;
        break;
      default:
        break;
    }
    setNewValue(newValue);
  };

  return value ? (
    <div className="cart-button__counter">
      <Button icon={true} onClick={() => handleOnClick('decrease')}>
        <span style={{ fontSize: 25, verticalAlign: 'middle' }}>-</span>
      </Button>
      <input onChange={handleInputChange} className="cart-button__input" value={value} min={0} max={10}></input>
      <Button icon={true} onClick={() => handleOnClick('increase')}>
        <span style={{ fontSize: 25, verticalAlign: 'middle' }}>+</span>
      </Button>
    </div>
  ) : (
    <Button onClick={() => handleOnClick('increase')} type={type} size={size} icon={icon}>
      {children}
    </Button>
  );
};

export default CartButton;
