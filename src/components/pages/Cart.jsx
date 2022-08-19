import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import ProductInCart from '../components/ProductInCart';
import { connect } from 'react-redux';
import cartSlice from '../../redux/slices/cartSlice';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';

class Cart extends PureComponent {
  // display() {
  //   const obj = this.props.cartSlice;
  //   const cartList = [];
  //   for (let i in obj) {
  //     cartList.push(obj[i]);
  //   }
  //   console.log(cartList);
  //   cartList.map((obj) => {
  //     const key = Object.keys(obj)[0];
  //     return (
  //       <ProductInCart
  //         id={key}
  //         product={obj[key]}
  //         currency={this.props.selectCurrencySlice.symbol}
  //       />
  //     );
  //   });
  // }
  render() {
    // console.log(this.props);

    const obj = this.props.cartSlice;
    const cartList = [];
    const inCart = [this.props.cartSlice];
    for (let i in obj) {
      cartList.push(obj[i]);
    }
    return (
      <>
        <div className="fw-700 fs-42">Cart</div>;
        <div className="emptyCart fw-400 fs-24">
          {cartList.length === 0 ? (
            <div>
              Nothing here for now...
              <Link to="/">
                <div className="fs-36">Return to shop</div>
              </Link>
            </div>
          ) : (
            <div>
              {/* {inCart.map(
                (product) => console.log(product),
                <ProductInCart
                  id={product.id}
                  key={product.id}
                  count={product.count}
                  attributes={product.attributes.currentAttributes}
                  currency={this.props.selectCurrencySlice.symbol}
                />
              )} */}
              {cartList.map((obj) => {
                const key = Object.keys(obj)[0];
                return (
                  <ProductInCart
                    id={obj[key]}
                    key={key}
                    // product={obj[key]}
                    currency={this.props.selectCurrencySlice.symbol}
                  />
                );
              })}
            </div>
          )}
        </div>
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
