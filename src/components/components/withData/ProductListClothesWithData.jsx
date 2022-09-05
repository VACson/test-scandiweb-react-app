import React, { PureComponent } from 'react';
import Loading from '../Loading';
import { ALL_CLOTHES } from '../../../apollo/products_clothes';
import { Query } from 'react-apollo';
import ProductListClothes from '../ProductListClothes';

export default class ProductListClothesWithData extends PureComponent {
  render() {
    return (
      <Query query={ALL_CLOTHES}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <p>{console.log(error)}</p>;
          return <ProductListClothes data={data} />;
        }}
      </Query>
    );
  }
}
