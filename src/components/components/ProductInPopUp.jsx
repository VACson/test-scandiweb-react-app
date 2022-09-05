import React from 'react';
import { PureComponent } from 'react';
import { connect } from 'react-redux';
import { incrementCartItem, decrementCart } from '../../redux/slices/cartSlice';
import Attributes from './Attributes';

class ProductInPopUp extends PureComponent {
  constructor(props) {
    super(props);
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
      <div className="productincart productincart--mini flex flex-row">
        <div className="productincart__info productincart__info--mini flex flex-row flex--nwrap flex--jcbetween">
          <div className="productincart__info__attributes flex flex-column">
            <div className="flex--full">
              <div className="fs-16 fw-300 flex--wrap">{this.props.data.brand}</div>
              <span className="fs-16 fw-300 mb-16 flex--wrap">{this.props.data.name}</span>

              <div className="product__description__price flex--full fs-16 fw-500 mb-8 mt-4">
                {this.props.data.prices[this.props.currency].currency.symbol}
                {price}
              </div>
              <Attributes
                data={this.props.data}
                itemIndex={this.props.itemIndex}
                id={this.props.id}
                isMini
              />
            </div>
          </div>

          <div className="productincart__info__buttons--mini flex flex-column flex--jcbetween">
            <button className="button__count button__count--mini" onClick={this.increment}>
              +
            </button>
            {this.props.cartSlice[this.props.itemIndex].count}
            <button className="button__count button__count--mini" onClick={this.decrement}>
              -
            </button>
          </div>
        </div>
        <div className="productincart__gallery productincart__gallery--mini">
          <img
            src={this.props.data.gallery[0]}
            className="product-block product-block--img product-block--img__incart--mini"
            alt={`product__${this.props.data.id}`}></img>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartSlice: state.cartSlice,
});
const mapDispatchToProps = () => ({ incrementCartItem, decrementCart });

export default connect(mapStateToProps, mapDispatchToProps())(ProductInPopUp);
