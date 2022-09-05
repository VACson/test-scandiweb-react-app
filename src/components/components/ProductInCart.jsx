import React from 'react';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import Attributes from './Attributes';
import { connect } from 'react-redux';
import { updateCartItem, incrementCartItem, decrementCart } from '../../redux/slices/cartSlice';
import { productLink } from './constants';

class ProductInCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
    };
    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
  }

  increment = () => {
    this.props.incrementCartItem({
      id: this.props.id,
    });
  };

  decrement = () => {
    this.props.decrementCart({
      id: this.props.id,
    });
  };

  render() {
    const price = (
      this.props.data.prices[this.props.currency].amount *
      this.props.cartSlice[this.props.itemIndex].count
    ).toFixed(2);
    return (
      <div className="productincart flex flex-row">
        <div className="productincart__info flex flex-row flex--nwrap flex--jcbetween">
          <div className="productincart__info__attributes flex flex-column">
            <div className="flex--full">
              <Link to={`${productLink}${this.props.data.id}`}>
                <div className="fs-30 fw-600 mb-16">{this.props.data.brand}</div>
                <div className="fs-30 fw-400 mb-20">{this.props.data.name}</div>
              </Link>
              <div className="product__description__price flex--full fs-24 fw-700">
                {this.props.data.prices[this.props.currency].currency.symbol}
                {price}
              </div>
              <Attributes
                data={this.props.data}
                itemIndex={this.props.itemIndex}
                id={this.props.id}
                isMini={false}
              />
            </div>
          </div>

          <div className="productincart__info__buttons flex flex-column flex--jcbetween fs-24 fw-500">
            <button className="button__count" onClick={this.increment}>
              +
            </button>
            {this.props.cartSlice[this.props.itemIndex].count}
            <button className="button__count" onClick={this.decrement}>
              -
            </button>
          </div>
        </div>
        <div className="productincart__gallery">
          <img
            src={this.props.data.gallery[this.state.currentImage]}
            className="product-block product-block--img product-block--img__incart"
            alt={`product__${this.props.data.id}`}></img>
          {this.state.currentImage > 0 && (
            <button
              className="button__imageChange button__imageChange--decrement"
              onClick={() =>
                this.setState((prevState) => ({ currentImage: prevState.currentImage - 1 }))
              }>
              &#60;
            </button>
          )}
          {this.state.currentImage < this.props.data.gallery.length - 1 && (
            <button
              className="button__imageChange button__imageChange--increment"
              onClick={() =>
                this.setState((prevState) => ({ currentImage: prevState.currentImage + 1 }))
              }>
              &#62;
            </button>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartSlice: state.cartSlice,
});
const mapDispatchToProps = () => ({ updateCartItem, incrementCartItem, decrementCart });

export default connect(mapStateToProps, mapDispatchToProps())(ProductInCart);
