import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { Component } from 'react';
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
    console.log(this.props);
    return (
      <Query query={getProductsQuery} variables={{ id: this.props.ID }}>
        {({ loading, error, data }) => {
          if (loading) return <p>{console.log('Loading')}</p>;
          if (error) return <p>{console.log(error)}</p>;
          return (
            <ProductInCart
              data={this.props.data}
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
      },
    });
  };

  render() {
    let price = (
      this.props.data.product.prices[this.props.currency].amount *
      this.props.cartSlice.items[this.props.id].count
    ).toFixed(2);
    const imageCount = this.props.data.product.gallery.length - 1;
    const allAttributes = this.props.data.product.attributes;
    console.log(this.props);
    if (this.props.data.product) {
      return (
        <div className="productincart productincart--mini flex flex-row">
          <div className="productincart__info productincart__info--mini flex flex-row flex--nwrap flex--jcbetween">
            <div className="productincart__info__attributes flex flex-column">
              <div className="flex--full">
                <span className="fs-16 fw-300 mb-16 flex--wrap">
                  {this.props.data.product.name}
                </span>
                <div className="fs-16 fw-300 mb-20 flex--wrap">{this.props.data.product.brand}</div>

                <div className="product__description__price flex--full fs-16 fw-500">
                  {this.props.data.product.prices[this.props.currency].currency.symbol}
                  {price}
                </div>
                {this.props.data.product.attributes.map((attribute, index) => {
                  const attributeIndex = index;
                  if (allAttributes[attributeIndex].type === 'swatch') {
                    return (
                      <div className="flex--full" key={this.props.id}>
                        <div className="fs-14 fw-400 mb-8">
                          {allAttributes[attributeIndex].name}:
                        </div>
                        <div className="flex">
                          {allAttributes[attributeIndex].items.map((items, index) => {
                            return (
                              <label
                                className={classNames('colorpick--mini  fs-16 fw-400', {
                                  'colorpick--mini--active':
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
                                  // onChange={this.handleChange}
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
                        <div className="fs-18 fw-700 roboto mb-8">
                          {allAttributes[attributeIndex].name}:
                        </div>
                        <div className="flex">
                          {allAttributes[attributeIndex].items.map((items, index) => {
                            var name = `${allAttributes[attributeIndex].name}`;
                            return (
                              <label
                                key={this.props.id.concat(
                                  allAttributes[attributeIndex].name.concat(
                                    allAttributes[attributeIndex].items[index].value,
                                  ),
                                )}
                                className={classNames('sizepick--mini fs-14 fw-400', {
                                  'sizepick--mini--active':
                                    this.props.cartSlice.items[this.props.id].attributes[
                                      allAttributes[attributeIndex].name
                                    ] === items.value,
                                })}
                                onClick={this.handleChange}
                                htmlFor={items.id__name}>
                                {console.log(
                                  this.props.id.concat(
                                    allAttributes[attributeIndex].name.concat(items.value),
                                  ),
                                )}
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
                })}
              </div>
            </div>

            <div className="productincart__info__buttons--mini flex flex-column flex--jcbetween">
              <button
                className="button__count button__count--mini"
                onClick={() => this.increment()}>
                +
              </button>
              {this.props.cartSlice.items[this.props.id].count}
              <button
                className="button__count button__count--mini"
                onClick={() => this.decrement()}>
                -
              </button>
            </div>
          </div>
          <div className="productincart__gallery productincart__gallery--mini">
            <img
              src={this.props.data.product.gallery[this.state.currentImage]}
              className="product-block product-block--img product-block--img__incart--mini"
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
