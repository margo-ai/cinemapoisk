export type TCardType = 'default' | 'disabled';

export type TCategory = { value: string; name: string; id: string };

export interface ICartProps {
  type?: TCardType;
  category: TCategory;
  name: string;
  price: string;
  desc: string;
  photos: string[];
}
