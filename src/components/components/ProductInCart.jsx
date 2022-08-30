import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import { connect } from 'react-redux';
import { updateCartItem, incrementCart, decrementCart } from '../../redux/slices/cartSlice';

const getProductsQuery = gql`
  query getProd($id: String!) {
    product(id: $id) {
      id
      name
      brand
      gallery
      attributes {
        name
        type
        items {
          displayValue
          id
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;
class ProductInCartWithQuery extends Component {
  render() {
    return (
      <Query query={getProductsQuery} variables={{ id: this.props.ID }}>
        {({ loading, error, data }) => {
          if (loading) return <p>Loading</p>;
          if (error) return <p>{console.log(error)}</p>;
          return (
            <ProductInCart
              data={data}
              currency={this.props.currency}
              id={this.props.id}
              cartSlice={this.props.cartSlice}
            />
          );
        }}
      </Query>
    );
  }
}
class ProductInCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      currentImage: 0,
      currentRadio: this.props.cartSlice.items[this.props.id].attributes,
      count: this.props.count,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  increment = () => {
    this.props.incrementCart({
      [this.props.id]: {
        id: [this.props.id],
      },
    });
  };
  decrement = () => {
    this.props.decrementCart({
      [this.props.id]: {
        id: [this.props.id],
      },
    });
  };
  handleChange = (e) => {
    const { name, value } = e.target;
    this.props.updateCartItem({
      [this.props.id]: {
        ...[this.props.id],
        count: this.props.cartSlice.items[this.props.id].count,
        price: this.props.cartSlice.items[this.props.id].price,
        attributes: { ...this.props.cartSlice.items[this.props.id].attributes, [name]: value },
        attr: { ...this.props.cartSlice.items[this.props.id].attr },
      },
    });
  };

  render() {
    let price = (
      this.props.data.product.prices[this.props.currency].amount *
      this.props.cartSlice.items[this.props.id].count
    ).toFixed(2);
    const imageCount = this.props.data.product.gallery.length - 1;
    const allAttributes = this.props.cartSlice.items[this.props.id].attr;
    if (this.props.data.product) {
      return (
        <div className="productincart flex flex-row">
          <div className="productincart__info flex flex-row flex--nwrap flex--jcbetween">
            <div className="productincart__info__attributes flex flex-column">
              <div className="flex--full">
                <Link to={`/product/${this.props.data.product.id}`}>
                  <div className="fs-30 fw-600 mb-16">{this.props.data.product.name}</div>
                </Link>
                <div className="fs-30 fw-400 mb-20">{this.props.data.product.brand}</div>

                <div className="product__description__price flex--full fs-24 fw-700">
                  {this.props.data.product.prices[this.props.currency].currency.symbol}
                  {price}
                </div>
                {this.props.data.product.attributes.map((attribute, index) => {
                  const attributeIndex = index;
                  if (allAttributes[attributeIndex].type === 'swatch') {
                    return (
                      <div className="flex--full" key={this.props.id}>
                        <div className="fs-18 fw-700 roboto mb-8 ttu">
                          {allAttributes[attributeIndex].name}:
                        </div>
                        <div className="flex">
                          {allAttributes[attributeIndex].items.map((items, index) => {
                            return (
                              <label
                                className={classNames('colorpick fs-16 fw-400', {
                                  'colorpick--active':
                                    this.props.cartSlice.items[this.props.id].attributes[
                                      allAttributes[attributeIndex].name
                                    ] === items.value,
                                })}
                                key={allAttributes[attributeIndex].name.concat(
                                  items.value.concat(this.props.id),
                                )}
                                style={{
                                  backgroundColor: `${items.value}`,
                                }}
                                onClick={this.handleChange}>
                                <input
                                  type="radio"
                                  className="radio"
                                  name={allAttributes[attributeIndex].name}
                                  value={items.value}
                                  defaultChecked={index === 0}></input>
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  if (allAttributes[attributeIndex].type === 'text') {
                    return (
                      <div
                        className="flex--full"
                        key={allAttributes[attributeIndex].name.concat(this.props.data.product.id)}>
                        <div className="fs-18 fw-700 roboto mb-8 ttu">
                          {allAttributes[attributeIndex].name}:
                        </div>
                        <div className="flex">
                          {allAttributes[attributeIndex].items.map((items, index) => {
                            return (
                              <label
                                key={this.props.id.concat(
                                  allAttributes[attributeIndex].name.concat(
                                    allAttributes[attributeIndex].items[index].value,
                                  ),
                                )}
                                className={classNames('sizepick sourcesans fs-16 fw-400', {
                                  'sizepick--active':
                                    this.props.cartSlice.items[this.props.id].attributes[
                                      allAttributes[attributeIndex].name
                                    ] === items.value,
                                })}
                                onClick={this.handleChange}
                                htmlFor={items.id__name}>
                                <input
                                  className="radio"
                                  type="radio"
                                  id={items.id__name}
                                  value={allAttributes[attributeIndex].items[index].value}
                                  name={allAttributes[attributeIndex].name}
                                  defaultChecked={index === 0}></input>
                                {items.value}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>

            <div className="productincart__info__buttons flex flex-column flex--jcbetween fs-24 fw-500">
              <button className="button__count" onClick={() => this.increment()}>
                +
              </button>
              {this.props.cartSlice.items[this.props.id].count}
              <button className="button__count" onClick={() => this.decrement()}>
                -
              </button>
            </div>
          </div>
          <div className="productincart__gallery">
            <img
              src={this.props.data.product.gallery[this.state.currentImage]}
              className="product-block product-block--img product-block--img__incart"
              alt={`product__${this.props.data.product.id}`}></img>
            {this.state.currentImage > 0 ? (
              <button
                className="button__imageCount button__imageCount--decrement"
                onClick={() =>
                  this.setState((prevState) => ({ currentImage: prevState.currentImage - 1 }))
                }>
                &#60;
              </button>
            ) : (
              ''
            )}
            {this.state.currentImage < imageCount ? (
              <button
                className="button__imageCount button__imageCount--increment"
                onClick={() =>
                  this.setState((prevState) => ({ currentImage: prevState.currentImage + 1 }))
                }>
                &#62;
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => ({
  cartSlice: state.cartSlice,
});
const mapDispatchToProps = () => ({ updateCartItem, incrementCart, decrementCart });

connect(mapStateToProps, mapDispatchToProps())(ProductInCart, ProductInCartWithQuery);
export default graphql(getProductsQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.id,
      },
    };
  },
})(connect(mapStateToProps, mapDispatchToProps())(ProductInCart), ProductInCartWithQuery);
