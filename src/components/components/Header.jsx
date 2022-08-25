import React from 'react';
import logo from '../../assets/img/Group.svg';
import cart from '../../assets/img/EmptyCart.svg';
import Currencies from './Currencies';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/slices/selectCategorySlice';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';

import { PureComponent } from 'react';
import CartPopUp from './CartPopUp';

class Header extends PureComponent {
  state = {
    isOpen: false,
    cartOpen: false,
  };
  popupClick = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen, cartOpen: false }));
  };
  cartPopupClick = () => {
    this.setState((prevState) => ({ cartOpen: !prevState.cartOpen, isOpen: false }));
  };

  render() {
    const categoryNames = ['ALL', 'CLOTHES', 'TECH'];
    const chooseCurrency = ['$', '£', 'A$', '¥', '₽'];
    const selectedCategory = this.props.selectCategorySlice.value;

    return (
      <div>
        <header className="header">
          <ul className="flex flex-row">
            {categoryNames &&
              categoryNames.map((name, index) => (
                <Link
                  to="/"
                  className={
                    selectedCategory === index ? 'header--item header--item-active' : 'header--item'
                  }
                  key={`${name}_${index}`}
                  onClick={() => this.props.selectCategory(index)}>
                  <li>{name}</li>
                </Link>
              ))}
          </ul>
          <img className="header--item header--item--logo" src={logo} width="32" alt="mainlogo" />
          <div className="flex flex-row">
            <div className="currencies header--item fw-500" onClick={this.popupClick}>
              {chooseCurrency[this.props.selectCurrencySlice.symbol]}&#160;
              <div className="currencies__arrow">&#5167;</div>{' '}
            </div>
            <div className="currencies__popup" onClick={this.popupClick}>
              {this.state.isOpen ? <Currencies /> : []}
            </div>
            <div className="cart__popup">{this.state.cartOpen ? <CartPopUp /> : []}</div>
            {/* <Link to="/cart"> */}
            <img height={16} src={cart} alt="cart-menu" onClick={this.cartPopupClick} />
            {this.props.cartSlice.length > 0 ? this.props.cartSlice.length : ''}
            {/* </Link> */}
          </div>
        </header>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  selectCategorySlice: state.selectCategorySlice,
  selectCurrencySlice: state.selectCurrencySlice,
  cartSlice: state.cartSlice,
});
const mapDispatchToProps = () => ({ selectCategory, selectCurrency });

export default connect(mapStateToProps, mapDispatchToProps())(Header);
