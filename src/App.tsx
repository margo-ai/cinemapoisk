import React from 'react';
import './styles/app.scss';
import Layout from './components/layout/Layout';
import Header from './components/header/Header';
import Logo from './components/logo/Logo';

function App() {
  return (
    <div className="app">
      <Layout>
        <Header>
          <Logo />
        </Header>
      </Layout>
    </div>
  );
}

export default App;
