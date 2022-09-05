import React, { PureComponent } from 'react';
import { Query } from 'react-apollo';
import Loading from '../Loading';
import { PRODUCT_QUERY } from '../../../apollo/product';
import ProductFull from '../ProductFull';

export default class ProductFullWithData extends PureComponent {
  render() {
    return (
      <Query query={PRODUCT_QUERY} variables={{ id: this.props.ID }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <p>{console.log(error)}</p>;
          return <ProductFull data={data} currency={this.props.currency} />;
        }}
      </Query>
    );
  }
}
