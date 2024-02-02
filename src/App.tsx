import React from 'react';
import { ApolloProvider } from '@apollo/client';

import './styles/app.scss';
import Layout from './components/layout/Layout';
import Header from './components/header/Header';
import Logo from './components/logo/Logo';
import List from './components/list/List';
import { client } from './graphql/client';
import CartButton from './components/cart/cart-button/CartButton';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <Layout>
          <Header>
            <Logo />
          </Header>
          <main className="main">
            {/* <List /> */}
            <CartButton />
          </main>
        </Layout>
      </div>
    </ApolloProvider>
  );
}

export default App;
