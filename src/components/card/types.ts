// import type { TCategory } from '../cart/cart-item/types';

export interface ICardProps {
  categoryName: string;
  name: string;
  price: number;
  desc: string;
  photo: string;
  id?: string;
}

export interface ICartListProps {
  cartBooks: (ICardProps & { count: number })[];
  removeItemHandler?: (id: string) => void;
}
