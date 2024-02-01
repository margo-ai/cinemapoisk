import React, { MouseEventHandler } from 'react';

import './button.scss';

interface IButtonProps {
  className?: string;
  type?: TButtonType;
  size?: TButtonSize;
  icon?: boolean;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export type TButtonSize = 'small' | 'medium' | 'large';
export type TButtonType = 'primary' | 'secondary' | 'danger' | 'success' | 'disabled' | 'icon';

const Button = ({
  className = '',
  type = 'primary',
  size = 'medium',
  icon = false,
  active = false,
  children,
  onClick,
}: React.PropsWithChildren<IButtonProps>) => {
  return (
    <button
      className={`button ${className} ${icon ? 'button--icon' : ''} ${
        icon && active ? 'button--icon__active' : ''
      } button--${type} button--${size}`}
      onClick={onClick}
    >
      <span className="button--inner">{children}</span>
    </button>
  );
};

export default Button;
