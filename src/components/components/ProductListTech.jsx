import React from 'react';
import { PureComponent } from 'react';
import { ALL_TECH } from '../../apollo/products_tech';
import { Query } from 'react-apollo';

class ProductListTech extends PureComponent {
  constructor({ category }) {
    console.log('TCL: products -> constructor -> product', category.products);
    super();
    this.products = category.products;
    this.name = category.name;
  }
  componentDidUpdate({ data }) {
    console.log('TCL: componentDidUpdate -> data', data);
  }
  render() {
    return (
      <>
        <h1>{this.name}</h1>
        <div className="product-list">
          {this.products.map((item) => (
            <div className="product-list--item" key={item.id}>
              <img
                className="product-block product-block--img"
                src={item.gallery[0]}
                alt={item.name}
              />
              <div>
                <div className="product-block product-block--text">{item.name}</div>

                <span className="product-block product-block--text">
                  {item.prices[0].currency.symbol}
                </span>
                <span className="product-block product-block--text">{item.prices[0].amount}</span>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }
}

class ProductsWithQuery extends PureComponent {
  render() {
    return (
      <Query query={ALL_TECH}>
        {({ data, loading }) => {
          if (loading) return null;
          return <ProductListTech category={data.category} />;
        }}
      </Query>
    );
  }
}

export default ProductsWithQuery;