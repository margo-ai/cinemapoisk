// import type { TCategory } from '../cart/cart-item/types';

export interface ICardProps {
  id: string;
  category: { name: string };
  name: string;
  price: number;
  desc?: string;
  photo?: string;
  updateList?: () => void;
  addToCartHandler?: (id: string, count: number) => void;
  count?: number;
  type?: 'default' | 'disabled';
}

export interface ICartListProps {
  cartBooks: (ICardProps & { count: number })[];
  removeItemHandler?: (id: string) => void;
}
