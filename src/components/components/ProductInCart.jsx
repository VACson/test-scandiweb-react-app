import React from 'react';
import { graphql } from 'react-apollo';
import { gql } from 'apollo-boost';
import { Query } from 'react-apollo';
import { PureComponent } from 'react';
import classNames from 'classnames';

import { connect } from 'react-redux';
import cartSlice, {
  updateCartItem,
  incrementCart,
  decrementCart,
} from '../../redux/slices/cartSlice';

const getProductsQuery = gql`
  query getProd($id: String!) {
    product(id: $id) {
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
class ProductInCart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      product: this.props.product,
      currentImage: 0,
      currentRadio: { ...this.props.cartSlice[this.props.id].attributes },
      count: this.props.count,
    };
  }

  displayProduct() {
    if (this.props.data.loading) {
      return <div>Loading</div>;
    } else {
      return <ProductInCart product={this.props.data.product} />;
    }
  }
  onClick = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      currentRadio: {
        ...prevState.currentRadio,
        [name]: value,
      },
      count: 1,
    }));
  };
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
    const currentAttributes = this.props.attributes;
    const { name, value } = e.target;
    this.props.updateCartItem({
      [this.props.id]: {
        ...[this.props.id],
        count: this.props.cartSlice[this.props.id].count,
        attributes: { [name]: value },
      },
    });
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
                  onClick={this.onClick}
                  style={{
                    backgroundColor: `${items.value}`,
                  }}>
                  <input
                    type="radio"
                    className="radio"
                    onChange={this.handleChange}
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
                  htmlFor={items.id__name}
                  onClick={this.onClick}>
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
    const chosenCurrency = this.props.currency;
    const chooseCurrency = ['$', '£', 'A$', '¥', '₽'];

    return (
      <Query query={getProductsQuery}>
        {({ loading, error, data, product }) => {
          if (loading) return 'Loading...';
          else if (error) return `Error! ${error.message}`;
          return (
            <div className="productincart flex flex-row">
              <div className="productincart__info flex flex-row flex--nwrap flex--jcbetween">
                <div className="productincart__info__attributes flex flex-column">
                  <div className="flex--full">
                    <div className="fs-30 fw-600 mb-16">{this.props.data.product.name}</div>
                    <div className="fs-24 fw-400 mb-20">{this.props.data.product.brand}</div>

                    <div className="product__description__price flex--full fs-24 fw-700">
                      {this.props.data.product.prices[this.props.currency].currency.symbol}
                      {this.props.data.product.prices[this.props.currency].amount *
                        this.props.cartSlice[this.props.id].count}
                    </div>
                    {this.props.data.product.attributes.map((attribute, index) =>
                      this.displayAttributes(index),
                    )}
                  </div>
                </div>

                <div className="productincart__info__buttons flex flex-column flex--jcbetween">
                  <button onClick={() => this.increment()}>+++</button>
                  {this.props.cartSlice[this.props.id].count}
                  <button onClick={() => this.decrement()}>---</button>
                </div>
              </div>
              <div className="productincart__gallery">
                <img
                  src={this.props.data.product.gallery[0]}
                  className="product-block product-block--img"
                  alt={`product__${this.props.data.product.id}`}
                  height={288}
                  width={200}></img>
              </div>

              {console.log(this.props)}
            </div>
          );
        }}
      </Query>
    );
  }
}
const mapStateToProps = (state) => ({
  cartSlice: state.cartSlice,
});
const mapDispatchToProps = () => ({ updateCartItem, incrementCart, decrementCart });

export default graphql(getProductsQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.id,
      },
    };
  },
})(connect(mapStateToProps, mapDispatchToProps())(ProductInCart));
