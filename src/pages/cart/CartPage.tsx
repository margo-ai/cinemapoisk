import React from 'react';

import CartList from '../../components/cart/cart-list/CartList';
import { useTypedDispatch } from 'src/store';
import { cartDeleteItem, cartSelectors } from 'src/redux/cartReducer';
import { useSelector } from 'react-redux';

const CartPage = () => {
  const dispatch = useTypedDispatch();
  const booksData = useSelector(cartSelectors.get);

  const removeItem = (id: string) => {
    dispatch(cartDeleteItem(id));
  };

  return <CartList cartBooks={booksData} removeItemHandler={removeItem} />;
};

export default CartPage;
