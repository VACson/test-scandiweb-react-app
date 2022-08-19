import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { selectCategory } from '../../redux/slices/selectCategorySlice';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';
import { selectProduct } from '../../redux/slices/selectProductSlice';

import cartCircle from '../../assets/img/Common.svg';

class Product extends PureComponent {
  state = {
    isHover: false,
  };
  render() {
    const chooseCurrency = ['$', '£', 'A$', '¥', '₽'];
    const onHover = () => {
      this.setState((prevState) => ({ isHover: true }));
      console.log();
    };
    const stopHover = () => {
      this.setState((prevState) => ({ isHover: false }));
    };
    const currentID = this.props.product.id;
    return (
      <div
        className="product-list--item"
        key={`product/${currentID}`}
        onMouseOver={onHover}
        onMouseLeave={stopHover}>
        <img
          className="product-block product-block--img"
          src={this.props.product.gallery[0]}
          alt={`product__${this.props.product.id}`}
          onClick={() => this.props.selectProduct(this.props.product.id)}></img>
        {this.state.isHover ? (
          <Link to={`/product/${this.props.product.id}`}>
            <img className="product__cartbutton" src={cartCircle} alt="" width={52} />{' '}
          </Link>
        ) : (
          ''
        )}

        <div className="product__description">
          {this.props.product.name}
          <div className="product__description__price">
            {chooseCurrency[this.props.selectCurrencySlice.symbol]}
            {this.props.product.prices[this.props.selectCurrencySlice.symbol].amount}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  selectCategorySlice: state.selectCategorySlice,
  selectCurrencySlice: state.selectCurrencySlice,
  selectProductSlice: state.selectProductSlice,
});
const mapDispatchToProps = () => ({ selectCategory, selectCurrency, selectProduct });

export default connect(mapStateToProps, mapDispatchToProps())(Product);
