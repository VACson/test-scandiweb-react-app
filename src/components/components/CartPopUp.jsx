import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import ProductInPopUp from '../components/ProductInPopUp';
import { connect } from 'react-redux';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';

class CartPopUp extends PureComponent {
  render() {
    const obj = this.props.cartSlice.items;
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
      <div className="cartpopup">
        {cartList.length === 0 ? (
          <div>
            Nothing here for now...
            <Link to="/">
              <div className="fs-36">Return to shop</div>
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
                  key={key}
                  currency={this.props.selectCurrencySlice.symbol}
                />
              );
            })}
            <div className="flex cartpopup__total">Total:{finalPrice}</div>
            <div className="flex flex--jcbetween cartpopup__buttons">
              <Link to="/cart">
                <button className="button button__popup fs-16 fw-600">VIEW BAG</button>
              </Link>

              <button className="button button__popup button__popup--green fs-16 fw-600">
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
