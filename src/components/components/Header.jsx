import React from 'react';
import logo from '../../assets/img/Group.svg';
import cart from '../../assets/img/EmptyCart.svg';
import Currencies from './Currencies';

export class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <div className="header--item header--item--active">ALL</div>
        <div className="header--item">CLOTHES</div>
        <div className="header--item">TECH</div>
        <img className="header--item header--item--logo" src={logo} width="32" alt="mainlogo" />
        <Currencies />
        <img className="header--item" src={cart} alt="cart-menu" />
      </header>
    );
  }
}
