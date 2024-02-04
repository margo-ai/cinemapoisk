import React, { PropsWithChildren } from 'react';

import { styled } from 'styled-components';

import { ICartListProps } from '../../card/types';

import Button from '../../button/Button';
import CartItem from '../cart-item/CartItem';

const StyledItemListWrapper = styled.div`
  display: grid;
  width: 100%;
  gap: 1em;
  margin-bottom: 2em;
`;

const StyledCartListFooter = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 0;
  margin-top: 0;
`;

const CartList = ({ cartBooks, removeItemHandler }: PropsWithChildren<ICartListProps>) => {
  const orderSum = cartBooks.reduce((sum, book) => {
    return sum + book.price * book.count;
  }, 0);

  const itemOnClickHandler = (id: string) => {
    console.log('Deleted', id);
    removeItemHandler(id);
  };

  return (
    <>
      <StyledItemListWrapper>
        {cartBooks?.length
          ? cartBooks.map(
              ({ category, name, price, desc, photo, id, count }) =>
                count > 0 && (
                  <CartItem
                    key={id}
                    id={id}
                    type="default"
                    category={category.name}
                    name={name}
                    price={price}
                    desc={desc}
                    photos={[photo]}
                    count={count}
                    handleOnClick={itemOnClickHandler}
                  />
                )
            )
          : 'Вы ещё не добавили книгу'}
      </StyledItemListWrapper>
      <StyledCartListFooter>
        <div>{`Итого: ${orderSum}`}</div>
        <Button>Оформить заказ</Button>
      </StyledCartListFooter>
    </>
  );
};

export default CartList;
