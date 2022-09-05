import React, { PureComponent } from 'react';
import { PRODUCT_QUERY } from '../../../apollo/product';
import { Query } from 'react-apollo';
import ProductInPopUp from '../ProductInPopUp';

export default class ProductInPopUpWithData extends PureComponent {
  render() {
    return (
      <Query query={PRODUCT_QUERY} variables={{ id: this.props.id }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading</p>;
          else if (error) return <p>{console.log(error)}</p>;
          else
            return (
              <ProductInPopUp
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
