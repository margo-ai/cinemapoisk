import { TButtonSize, TButtonType } from '../../button/Button';

export interface ICartButtonProps {
  type?: TButtonType;
  size?: TButtonSize;
  icon?: boolean;
  count?: number;
  setNewCount?: (count: number) => void;
}

export type TAction = 'increase' | 'decrease';
