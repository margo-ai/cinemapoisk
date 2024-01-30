import React, { ChangeEvent, FocusEventHandler, forwardRef } from 'react';
import styled from 'styled-components';

import { TCustomValue } from '../select/Select';

const StyledInput = styled.input<{ $type: string; $size: string }>`
  width: ${({ $type }) => {
    if ($type === 'radio') return 'auto';
    return '100%';
  }};
  padding: ${({ $size }) => {
    if ($size === 'small') return '10px 16px';
    if ($size === 'large') return '12px 24px';
    return '11px 20px';
  }};
  outline: none;
  background: transparent;
  border: 1px solid var(--active-color);
  border-radius: 2px;
  color: grey;
  max-width: 280px;
  font-size: ${({ $size }) => {
    if ($size === 'small') return '12px';
    if ($size === 'large') return '16px';
    return '14px';
  }};
`;

export type TInputSize = 'small' | 'medium' | 'big';

interface IInput {
  type?: string;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  value?: TCustomValue;
  size?: TInputSize;
  disabled?: boolean;
  required?: boolean;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  onBlur?: FocusEventHandler<HTMLInputElement>;
}

const Input = forwardRef(
  (
    {
      type = 'search',
      id = '',
      name = '',
      className = '',
      placeholder = 'введите слово',
      value = '',
      size = 'medium',
      disabled = false,
      required = false,
      checked = false,
      onChange,
      onFocus,
      onBlur,
    }: IInput,
    ref
  ) => (
    <StyledInput
      $type={type}
      $size={size}
      id={id}
      className={`input ${className} input--${size}`}
      name={name}
      type={type}
      value={value}
      disabled={disabled}
      required={required}
      checked={checked}
      placeholder={placeholder}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e)}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  )
);

export default Input;
