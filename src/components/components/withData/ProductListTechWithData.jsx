import React, { PureComponent } from 'react';
import Loading from '../Loading';
import { ALL_TECH } from '../../../apollo/products_tech';
import { Query } from 'react-apollo';
import ProductListTech from '../ProductListTech';

export default class ProductListTechWithData extends PureComponent {
  render() {
    return (
      <Query query={ALL_TECH}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <p>{console.log(error)}</p>;
          return <ProductListTech data={data} />;
        }}
      </Query>
    );
  }
}
