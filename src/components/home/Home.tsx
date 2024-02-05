import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import styled from 'styled-components';

/** Components */
import Layout from '../layout/Layout';
import Header from '../header/Header';
import Logo from '../logo/Logo';
import Button from '../button/Button';
import Navigation from '../navigation/Navigation';

/** Icons */
import { ShoppingBagIcon, ArrowLeftEndOnRectangleIcon, UserIcon } from '@heroicons/react/24/solid';

// const StyledAvatar = styled.b`
//   padding: 5.5px 4.5px;
//   border-radius: 50%;
//   border: 2px solid #222;
// `;

const Home = () => {
  return (
    <Layout>
      <Header>
        <NavLink to={'/'}>
          <Logo />
        </NavLink>
        <Navigation />
        <div style={{ display: 'flex', gap: 50 }}>
          <NavLink to={'/cart'}>
            <ShoppingBagIcon className="app--header__actions-icon" />
          </NavLink>
          <NavLink to={'/profile'}>
            <UserIcon className="app--header__actions-icon">Мой аватар</UserIcon>
          </NavLink>
          <NavLink to={'/login'}>
            <ArrowLeftEndOnRectangleIcon className="app--header__actions-icon" />
          </NavLink>
        </div>
      </Header>

      <main className="main">
        <Outlet />
      </main>
    </Layout>
  );
};

export default Home;
