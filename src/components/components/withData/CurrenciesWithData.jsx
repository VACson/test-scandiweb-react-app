import React, { PureComponent } from 'react';
import Currencies from '../Currencies';
import { Query } from 'react-apollo';
import { ALL_CURRENCIES } from '../../../apollo/currencies';
import Loading from '../Loading';

export default class CurrenciesWithData extends PureComponent {
  render() {
    return (
      <Query query={ALL_CURRENCIES}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <p>{console.log(error)}</p>;
          return <Currencies data={data} />;
        }}
      </Query>
    );
  }
}
