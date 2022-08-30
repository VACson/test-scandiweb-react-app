import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import ProductInPopUp from '../components/ProductInPopUp';
import { connect } from 'react-redux';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';

class CartPopUp extends PureComponent {
  render() {
    const obj = this.props.cartSlice.items;
    const cartList = [];
    const currency = ['$', '£', 'A$', '¥', '₽'];
    let plural = '';
    let price = 0;
    if (this.props.cartSlice.length === 1) {
      plural = '';
    } else plural = 's';
    for (let i in obj) {
      price += obj[i].count * obj[i].price[this.props.selectCurrencySlice.symbol].amount;
    }
    const finalPrice = (price * 1.21).toFixed(2);
    for (let i in obj) {
      cartList.push(obj[i]);
    }
    return (
      <div className="cartpopup">
        <span className="mt-32 ml-16 fw-700">My bag,</span>
        <span className="fw-500">
          {this.props.cartSlice.length} item{plural}
        </span>
        {cartList.length === 0 ? (
          <div>
            <Link to="/" onClick={this.props.onClick}>
              <button className="button button__popup fs-18 ml-16 mb-16">Return to shop</button>
            </Link>
          </div>
        ) : (
          <div>
            {cartList.map((obj) => {
              const key = Object.keys(obj)[0];
              price = obj.price * obj.count;

              return (
                <ProductInPopUp
                  id={obj[key]}
                  key={obj[key]}
                  currency={this.props.selectCurrencySlice.symbol}></ProductInPopUp>
              );
            })}
            <div className="flex flex--jcbetween cartpopup__total fw-500 fs-16">
              Total
              <span className="fw-700">
                {currency[this.props.selectCurrencySlice.symbol]}
                {finalPrice}
              </span>
            </div>
            <div className="flex flex--jcbetween cartpopup__buttons">
              <Link to="/cart" onClick={this.props.onClick}>
                <button className="button button__popup fs-14 fw-600">VIEW BAG</button>
              </Link>
              <button className="button button__popup button__popup--green fs-14 fw-600">
                CHECK OUT
              </button>
            </div>
          </div>
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
