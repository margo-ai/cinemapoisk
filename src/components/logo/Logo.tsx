import React from 'react';
import './logo.scss';
import LogoSvg from '../../assets/film-movies-icon.svg';

interface ILogoProps {
  size?: 'small' | 'medium' | 'big';
}

const Logo = ({ size = 'medium' }: ILogoProps) => {
  return (
    <div className="logo">
      <div className="logo__inner">
        <img className={`logo__inner__img logo__inner__img--${size}`} src={LogoSvg} alt="logo" />
        <div className="logo__inner__text">BookPoisk</div>
      </div>
    </div>
  );
};

export default Logo;
