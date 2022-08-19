import React, { PureComponent } from 'react';
import classNames from 'classnames';

import gql from 'graphql-tag';
import { graphql, Query } from 'react-apollo';

import Button from './Button';

// import { connect } from 'react-redux';
// import { selectCategory } from '../../redux/slices/selectCategorySlice';
// import { selectCurrency } from '../../redux/slices/selectCurrencySlice';
// import { addToCart } from '../../redux/slices/addToCartSlice';
const getBooksQuery = gql`
  query getProd($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
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
          symbol
          label
        }
        amount
      }
      brand
    }
  }
`;
class ProductFull extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      currentRadio: {},
    };
  }
  displayProducts() {
    var Data = this.props.data;

    if (Data.loading) {
      return <div>Loading products...</div>;
    } else {
      return <ProductFull product={Data.product} />;
    }
  }
  createMarkup() {
    return { __html: this.props.data.product.description };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    console.log(e.target);
    this.setState((prevState) => ({
      currentRadio: {
        ...prevState.currentRadio,
        [name]: value,
      },
    }));
  };

  displayAttributes(attributeIndex) {
    var allAttributes = this.props.data.product.attributes;

    const initialSetState = () =>
      this.setState((prevState) => ({
        currentRadio: {
          ...prevState.currentRadio,
          [allAttributes[attributeIndex].name]: allAttributes[attributeIndex].items[0].value,
        },
      }));

    if (allAttributes[attributeIndex].type === 'swatch') {
      return (
        <div className="flex--full">
          <div className="fs-18 fw-700 roboto mb-8">{allAttributes[attributeIndex].name}:</div>
          <div className="flex">
            {this.state.currentRadio[allAttributes[attributeIndex].name] ? '' : initialSetState()}

            {allAttributes[attributeIndex].items.map((items, index) => {
              return (
                <label
                  className={classNames('colorpick  fs-16 fw-400', {
                    'colorpick--active': this.state.currentRadio.Color === items.value,
                  })}
                  key={items.value}
                  onClick={this.handleChange}
                  style={{
                    backgroundColor: `${items.value}`,
                  }}
                  htmlFor={allAttributes[attributeIndex].id__name}>
                  <input
                    type="radio"
                    id={allAttributes[attributeIndex].id__name}
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
    } else if (allAttributes[attributeIndex].type === 'text') {
      return (
        <div className="flex--full">
          <div className="fs-18 fw-700 roboto mb-8">{allAttributes[attributeIndex].name}:</div>
          <div className="flex">
            {this.state.currentRadio[allAttributes[attributeIndex].name] ? '' : initialSetState()}
            {allAttributes[attributeIndex].items.map((items, index) => {
              var name = `${allAttributes[attributeIndex].name}`;
              return (
                <label
                  className={classNames('sizepick fs-16 fw-400', {
                    'sizepick--active': this.state.currentRadio[name] === items.value,
                  })}
                  key={items.id__value}
                  htmlFor={items.id__name}>
                  <input
                    className="radio"
                    type="radio"
                    id={items.id__name}
                    value={items.value}
                    name={allAttributes[attributeIndex].name}
                    onChange={this.handleChange}
                    defaultChecked={index === 0}></input>
                  {items.value}
                </label>
              );
            })}
          </div>
        </div>
      );
    }
  }
  render() {
    const chooseCurrency = ['$', '£', 'A$', '¥', '₽'];
    return (
      <Query query={getBooksQuery}>
        {({ loading, error, data }) => {
          if (loading) return <p>{console.log('Loading')}</p>;
          if (error) return <p>{console.log(error)}</p>;
          return (
            <div className="productpage__container">
              <div className="flex flex-column">
                {this.props.data.product.gallery.map((gallery, index) => {
                  return (
                    <img
                      src={gallery}
                      width={80}
                      key={index}
                      onClick={() => this.setState(() => ({ currentImage: index }))}
                      alt={gallery}
                      style={{ objectFit: 'cover' }}
                    />
                  );
                })}
              </div>
              <img
                src={this.props.data.product.gallery[this.state.currentImage]}
                width={610}
                height={511}
                className="productpage__container__img"
                alt="main"
              />

              <div className="flex flex-column productpage__container__sidetext">
                <div className="flex--full">
                  <div className="fs-30 fw-600 mb-16">{this.props.data.product.name}</div>
                  <div className="fs-24 fw-400 mb-44">{this.props.data.product.brand}</div>
                </div>
                {this.props.data.product.attributes.map((attribute, index) =>
                  this.displayAttributes(index),
                )}{' '}
                <div className="flex--full roboto fs-18 fw-700 mt-36 mb-10">Price:</div>
                <div className="product__description__price flex--full fs-24 fw-700">
                  {chooseCurrency[this.props.currency]}
                  {this.props.data.product.prices[this.props.currency].amount}
                </div>
                <Button
                  attributes={this.state.currentRadio}
                  id={this.props.data.product.id}
                  count={1}
                />
                <div
                  dangerouslySetInnerHTML={this.createMarkup()}
                  className="product__description__text roboto fw-400 flex-column"></div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default graphql(getBooksQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.ID,
      },
    };
  },
})(ProductFull);
