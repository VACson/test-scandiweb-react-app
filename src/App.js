import React, { PureComponent } from 'react';

import Header from './components/components/Header';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';

import { Route, Routes } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo/client';

class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="cart" element={<Cart />} />
          </Route>
        </Routes>
      </ApolloProvider>
    );
  }
}

export default App;
