import React from 'react';
import { Header } from './components/components/Header';
import Home from './components/pages/Home';
import { ApolloProvider } from 'react-apollo';
import client from './apollo/client';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Header />
        <Home />
      </div>
    </ApolloProvider>
  );
}

export default App;
