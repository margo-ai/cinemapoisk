import React, { PropsWithChildren } from 'react';
import './header.scss';

const Header = ({ children }: PropsWithChildren) => {
  return (
    <header className="header">
      <div className="header__inner">{children}</div>
    </header>
  );
};

export default Header;
