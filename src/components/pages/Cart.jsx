import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import ProductInCart from '../components/ProductInCart';
import { connect } from 'react-redux';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';

class Cart extends PureComponent {
  render() {
    const obj = this.props.cartSlice.items;
    const currency = ['$', '£', 'A$', '¥', '₽'];
    const cartList = [];
    let price = 0;
    for (let i in obj) {
      price += obj[i].count * obj[i].price[this.props.selectCurrencySlice.symbol].amount;
    }
    const tax = (price * 0.21).toFixed(2);
    const finalPrice = (price * 1.21).toFixed(2);
    for (let i in obj) {
      cartList.push(obj[i]);
    }
    return (
      <>
        <div className="fw-700 fs-42">Cart</div>;
        {cartList.length === 0 ? (
          <div className="emptyCart fw-400 fs-24">
            Nothing here for now...
            <Link to="/">
              <div className="fs-36">Return to shop</div>
            </Link>
          </div>
        ) : (
          <div>
            {cartList.map((obj) => {
              console.log(obj.price);
              const key = Object.keys(obj)[0];
              price = obj.price * obj.count;
              // symbol = obj.
              return (
                <ProductInCart
                  id={obj[key]}
                  key={obj[key]}
                  currency={this.props.selectCurrencySlice.symbol}
                />
              );
            })}
            <div className="cart__order">
              <div className="flex cart__order__item">
                Tax 21%:
                <span className="fw-700 fs-24 lh-28">
                  {currency[this.props.selectCurrencySlice.symbol]}
                  {tax}
                </span>
              </div>
              <div className="flex cart__order__item">
                Quantity:<span className="fw-700 fs-24 lh-28">{this.props.cartSlice.length}</span>
              </div>
              <div className="flex cart__order__item">
                Total:
                <span className="fw-700 fs-24 lh-28">
                  {currency[this.props.selectCurrencySlice.symbol]}
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
