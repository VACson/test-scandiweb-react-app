import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import ProductInPopUpWithData from '../components/withData/ProductInPopUpWithData';
import { connect } from 'react-redux';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';
import { homeLink, cartLink, currencySymbolsData } from './constants';

class CartPopUp extends PureComponent {
  render() {
    const chosenCurrency = currencySymbolsData[this.props.selectCurrencySlice.symbol];
    const taxPercent = 1.21;
    const cartCount = this.props.cartSlice.reduce((a, item) => {
      return item.count + a;
    }, 0);
    const finalPrice = this.props.cartSlice
      .reduce((a, item) => {
        return (
          item.price[this.props.selectCurrencySlice.symbol].amount * item.count * taxPercent + a
        );
      }, 0)
      .toFixed(2);
    return (
      <div className="cart__popup">
        <span className="mt-32 fw-700">My bag, </span>
        <span className="fw-500">
          {cartCount} item{cartCount !== 1 && 's'}
        </span>
        {this.props.cartSlice.length === 0 ? (
          <div>
            <Link to={homeLink} onClick={this.props.onClick}>
              <button className="button button__popup button__popup--empty fs-18">
                Return to shop
              </button>
            </Link>
          </div>
        ) : (
          <>
            {this.props.cartSlice.map((obj, index) => {
              return (
                <ProductInPopUpWithData
                  id={obj.id}
                  itemIndex={index}
                  key={obj.id}
                  currency={this.props.selectCurrencySlice.symbol}
                />
              );
            })}
            <div className="flex flex--jcbetween cart__popup__total fw-500 fs-16">
              Total
              <span className="fw-700">
                {chosenCurrency}
                {finalPrice}
              </span>
            </div>
            <div className="flex flex--jcbetween cart__popup__buttons">
              <Link to={cartLink} onClick={this.props.onClick}>
                <button className="button button__popup fs-14 fw-600">VIEW BAG</button>
              </Link>
              <button className="button button__popup button__popup--green fs-14 fw-600">
                CHECK OUT
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  selectCurrencySlice: state.selectCurrencySlice,
  cartSlice: state.cartSlice,
});
const mapDispatchToProps = () => ({ selectCurrency });
export default connect(mapStateToProps, mapDispatchToProps())(CartPopUp);
