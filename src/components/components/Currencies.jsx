import React from 'react';
import { PureComponent } from 'react';
import { ALL_CURRENCIES } from '../../apollo/currencies';
import { Query } from 'react-apollo';

class Currencies extends PureComponent {
  constructor({ currencies }) {
    console.log('TCL: Currencies -> constructor -> currencies', currencies);
    super();
    this.currencies = currencies;
  }

  componentDidUpdate({ data }) {
    console.log('TCL: componentDidUpdate -> data', data);
  }
  render() {
    return (
      <>
        {this.currencies.map((currency) => (
          <div className="123" key={currency.label}>
            {currency.label}
          </div>
        ))}
      </>
    );
  }
}

class CurrenciesWithQuery extends PureComponent {
  render() {
    return (
      <Query query={ALL_CURRENCIES}>
        {({ data, loading }) => {
          if (loading) return null; // add loader
          return <Currencies currencies={data.currencies} />;
        }}
      </Query>
    );
  }
}

export default CurrenciesWithQuery;
