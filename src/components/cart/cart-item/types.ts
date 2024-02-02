export type TCardType = 'default' | 'disabled';

// export type TCategory = { value: string; name: string; id: string };

export interface ICartProps {
  type?: TCardType;
  category: string;
  name: string;
  price: number;
  desc: string;
  photos: string[];
}
