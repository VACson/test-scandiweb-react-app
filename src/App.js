import React, { PureComponent } from 'react';

import Header from './components/components/Header';
import Home from './components/pages/Home';
import Cart from './components/pages/Cart';

import { Route, BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import client from './apollo/client';
import ProductPage from './components/pages/ProductPage';

class App extends PureComponent {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/cart" component={Cart} />
          <Route path="/product/:slug" component={ProductPage} />
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
