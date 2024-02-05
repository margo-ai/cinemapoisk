import React from 'react';

import './styles/app.scss';

import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ListPage from './pages/list/ListPage';
import CartPage from './pages/cart/CartPage';
import LoginPage from './pages/login/LoginPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}>
        <Route index element={<ListPage />} />
        {/* <Route path="profile" element={<>A</>} /> */}
        <Route path="cart" element={<CartPage />} />
        <Route path="login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default App;
