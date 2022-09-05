import React from 'react';
import { PureComponent } from 'react';
import Product from './Product';

class ProductListClothes extends PureComponent {
  render() {
    return (
      <>
        <div className="fw-400 fs-42 mt-80 mb-100">
          {this.props.data.category.name.charAt(0).toUpperCase() +
            this.props.data.category.name.slice(1)}
        </div>
        <div className="product-list">
          {this.props.data.category.products.map((product, index) => {
            return <Product product={product} key={index + product.id} />;
          })}
        </div>
      </>
    );
  }
}

export default ProductListClothes;
