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
  constructor(props) {
    super(props);
    this.popupClick = this.popupClick.bind(this);
    this.cartPopupClick = this.cartPopupClick.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.state = {
      isOpen: false,
      cartOpen: false,
    };
  }

  popupClick = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen, cartOpen: false }));
  };
  cartPopupClick = () => {
    this.setState((prevState) => ({ cartOpen: !prevState.cartOpen, isOpen: false }));
  };
  closePopup = () => {
    this.setState(() => ({
      cartOpen: false,
      isOpen: false,
    }));
  };

  render() {
    const categoryNames = ['ALL', 'CLOTHES', 'TECH'];
    const chooseCurrency = ['$', '£', 'A$', '¥', '₽'];
    const selectedCategory = this.props.selectCategorySlice.value;
    if (this.state.cartOpen === true) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    return (
      <div>
        <header className="header">
          <ul className="flex flex-row" onClick={this.closePopup}>
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
          <Link to="/" className="header--item header--item--logo" onClick={this.closePopup}>
            <img src={logo} width="32" alt="mainlogo" />
          </Link>
          <div className="flex flex-row">
            <div className="currencies header--item fw-500" onClick={this.popupClick}>
              {chooseCurrency[this.props.selectCurrencySlice.symbol]}&#160;
              <div className="currencies__arrow">&#5167;</div>{' '}
            </div>
            <div className="currencies__popup" onClick={this.popupClick}>
              {this.state.isOpen ? <Currencies /> : []}
            </div>

            <div className="cart__popup">
              {this.state.cartOpen ? <CartPopUp onClick={this.cartPopupClick} /> : []}
            </div>
            <div
              className="cart__icon"
              onClick={this.props.cartSlice.length > 0 ? this.cartPopupClick : null}>
              <img height={16} src={cart} alt="cart-menu" />
              {this.props.cartSlice.length > 0 ? (
                <div className="cart__icon__count">{this.props.cartSlice.length}</div>
              ) : null}
            </div>
            {this.state.cartOpen ? <div className="modal" onClick={this.cartPopupClick}></div> : []}
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
