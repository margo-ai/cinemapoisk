import React from 'react';
import './styles/app.scss';
import Layout from './components/layout/Layout';
import Header from './components/header/Header';
import Logo from './components/logo/Logo';
import List from './components/list/List';

function App() {
  return (
    <div className="app">
      <Layout>
        <Header>
          <Logo />
        </Header>
        <main className="main">
          <List />
        </main>
      </Layout>
    </div>
  );
}

export default App;
