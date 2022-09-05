import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import ProductInCartWithData from '../components/withData/ProductInCartWithData';
import { connect } from 'react-redux';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';
import { currencySymbolsData, homeLink } from '../components/constants';

class Cart extends PureComponent {
  render() {
    const currencySymbols = currencySymbolsData;
    const taxPercent = 0.21;
    const totalTaxPercent = taxPercent + 1;
    const finalPrice = this.props.cartSlice
      .reduce((a, item) => {
        return (
          item.price[this.props.selectCurrencySlice.symbol].amount * item.count * totalTaxPercent +
          a
        );
      }, 0)
      .toFixed(2);
    const tax = (finalPrice * taxPercent).toFixed(2);
    return (
      <>
        <div className="fw-700 fs-42 mt-80 mb-55">CART</div>;
        {this.props.cartSlice.length === 0 ? (
          <div className="emptyCart fw-400 fs-24">
            Nothing here for now...
            <Link to={homeLink}>
              <button className="button fs-24">Click to return to shop</button>
            </Link>
          </div>
        ) : (
          <div>
            {this.props.cartSlice.map((cartItem, index) => {
              return (
                <ProductInCartWithData
                  id={cartItem.id}
                  itemIndex={index}
                  key={cartItem.id}
                  currency={this.props.selectCurrencySlice.symbol}
                />
              );
            })}
            <div className="cart__order">
              <div className="flex cart__order__item">
                Tax 21%:
                <span className="fw-700 fs-24 lh-28">
                  {currencySymbols[this.props.selectCurrencySlice.symbol]}
                  {tax}
                </span>
              </div>
              <div className="flex cart__order__item">
                Quantity:<span className="fw-700 fs-24 lh-28">{this.props.cartSlice.length}</span>
              </div>
              <div className="flex cart__order__item">
                Total:
                <span className="fw-700 fs-24 lh-28">
                  {currencySymbols[this.props.selectCurrencySlice.symbol]}
                  {finalPrice}
                </span>
              </div>
              <button className="button button__addToCart fs-16 fw-600">ORDER</button>
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  selectCurrencySlice: state.selectCurrencySlice,
  cartSlice: state.cartSlice,
});
const mapDispatchToProps = () => ({ selectCurrency });
export default connect(mapStateToProps, mapDispatchToProps())(Cart);
