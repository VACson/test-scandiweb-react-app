import React, { PureComponent } from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';
import Currency from './Currency';

const getBooksQuery = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

class Currencies extends PureComponent {
  displayCurrencies() {
    var data = this.props.data;

    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.currencies.map((currency, index) => {
        return <Currency currency={currency} key={index} symbolIndex={index} />;
      });
    }
  }
  render() {
    return <div>{this.displayCurrencies()}</div>;
  }
}

export default graphql(getBooksQuery)(Currencies);
