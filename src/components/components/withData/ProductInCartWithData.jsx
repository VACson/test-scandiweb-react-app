import React, { Component } from 'react';
import { Query } from 'react-apollo';
import ProductInCart from '../ProductInCart';
import { PRODUCT_QUERY } from '../../../apollo/product';
import Loading from '../Loading';

class ProductInCartWithData extends Component {
  render() {
    return (
      <Query query={PRODUCT_QUERY} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return <Loading />;
          if (error) return <p>{console.log(error)}</p>;
          return (
            <ProductInCart
              data={data.product}
              currency={this.props.currency}
              itemIndex={this.props.itemIndex}
              id={this.props.id}
              cartSlice={this.props.cartSlice}
            />
          );
        }}
      </Query>
    );
  }
}
export default ProductInCartWithData;
