import React, { PropsWithChildren } from 'react';
import './layout.scss';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="layout">
      <div className="layout__inner">{children}</div>
    </div>
  );
};

export default Layout;
