import React from 'react';
import Logo from './svg/Logo';
import EmptyCart from './svg/EmptyCart';
import CurrenciesWithData from './withData/CurrenciesWithData';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/slices/selectCategorySlice';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';
import { Names, currencySymbolsData, homeLink } from './constants';

import { PureComponent } from 'react';
import CartPopUp from './CartPopUp';

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.logoClick = this.logoClick.bind(this);
    this.onCategoryClick = this.onCategoryClick.bind(this);
    this.state = {
      currenciesOpen: false,
      cartOpen: false,
    };
  }

  currenciesClick = () => {
    this.setState((prevState) => ({ currenciesOpen: !prevState.currenciesOpen, cartOpen: false }));
  };
  cartPopupClick = () => {
    this.setState((prevState) => ({ cartOpen: !prevState.cartOpen, currenciesOpen: false }));
  };
  logoClick = () => {
    this.closePopup();
    this.props.selectCategory(0);
  };
  closePopup = () => {
    this.setState(() => ({
      cartOpen: false,
      currenciesOpen: false,
    }));
  };
  onCategoryClick = (index) => {
    this.props.selectCategory(index);
  };

  render() {
    const categoryNames = Names;
    const chosenCurrency = currencySymbolsData[this.props.selectCurrencySlice.symbol];
    const cartCount = this.props.cartSlice.reduce((a, item) => {
      return item.count + a;
    }, 0);
    return (
      <div>
        <header className="header">
          <ul className="flex flex-row" onClick={this.closePopup}>
            {categoryNames?.map((name, index) => (
              <Link
                to={homeLink}
                className={
                  index === this.props.selectCategorySlice.value
                    ? 'header--item header--item-active'
                    : 'header--item'
                }
                key={`${name}_${index}`}
                onClick={() => this.onCategoryClick(index)}>
                <li>{name}</li>
              </Link>
            ))}
          </ul>
          <Link to={homeLink} className="header--item header--item--logo" onClick={this.logoClick}>
            <Logo />
          </Link>
          <div className="flex flex-row header--item">
            <div className="currencies header--item fw-500" onClick={this.currenciesClick}>
              {chosenCurrency}&#160;
              <div className="currencies__arrow">&#5167;</div>
            </div>
            <div className="currencies__popup" onClick={this.currenciesClick}>
              {this.state.currenciesOpen && <CurrenciesWithData />}
            </div>
            {this.state.cartOpen && <CartPopUp onClick={this.cartPopupClick} />}
            <div
              className="cart__icon"
              onClick={this.props.cartSlice.length > 0 ? this.cartPopupClick : null}>
              <EmptyCart />
              {cartCount > 0 ? (
                <div className="cart__icon__count fs-14 fw-700 roboto">{cartCount}</div>
              ) : null}
            </div>
          </div>
        </header>
        {this.state.currenciesOpen && (
          <div className="modal modal--transparent" onClick={this.closePopup}></div>
        )}
        {this.state.cartOpen && <div className="modal" onClick={this.closePopup}></div>}
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
