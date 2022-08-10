import React from 'react';
import { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import Product from './Product';
import { gql } from 'apollo-boost';

const getProductsQuery = gql`
  {
    category(input: { title: "clothes" }) {
      name
      products {
        name
        id
        gallery
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;

class ProductListClothes extends PureComponent {
  displayName() {
    var data = this.props.data;

    if (data.loading) {
      return <div className="">loading</div>;
    } else {
      return (
        <div className="fw-400 fs-42">
          {data.category.name.charAt(0).toUpperCase() + data.category.name.slice(1)}
        </div>
      );
    }
  }
  displayProducts() {
    var data = this.props.data;
    console.log(this.props.data);
    if (data.loading) {
      return <div>Loading books...</div>;
    } else {
      return data.category.products.map((product, index) => {
        return <Product product={product} key={index} />;
      });
    }
  }
  render() {
    return (
      <>
        {this.displayName()}
        <div className="product-list">{this.displayProducts()}</div>
      </>
    );
  }
}

export default graphql(getProductsQuery)(ProductListClothes);
