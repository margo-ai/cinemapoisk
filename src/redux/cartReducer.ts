import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICardProps } from '../components/card/types';
import { RootState } from '../../src/store';

type TId = ICardProps['id'];
type TCartElement = ICardProps & { count: number };

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addItem: (state, action: PayloadAction<TCartElement>) => [
      ...state.filter(({ id }) => id !== action.payload.id),
      action.payload,
    ],
    deleteItem: (state, action: PayloadAction<TId>) => state.filter(({ id }) => id !== action.payload),
  },
});

export const cartSelectors = {
  get: (state: RootState): RootState['cart'] => state.cart,
};

export const { addItem: cartAddItem, deleteItem: cartDeleteItem } = cartSlice.actions;

export default cartSlice.reducer;
