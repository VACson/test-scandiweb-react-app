import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { selectCategory } from '../../redux/slices/selectCategorySlice';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';

import { currencySymbolsData, productLink } from './constants';
import CartCircleButton from './svg/CartCircleButton';

class Product extends PureComponent {
  render() {
    const chosenCurrency = currencySymbolsData[this.props.selectCurrencySlice.symbol];
    const currentID = this.props.product.id;
    return (
      <div className="product-list--item" key={`product/${currentID}`}>
        <img
          className="product-block product-block--img"
          src={this.props.product.gallery[0]}
          alt={`product__${currentID}`}
        />
        {!this.props.product.inStock && (
          <div className="product-block--img--outofstock">OUT OF STOCK</div>
        )}
        {this.props.product.inStock && (
          <div className="product__cartbutton__background">
            <Link to={`${productLink}${currentID}`} className="product__cartbutton">
              <CartCircleButton />
            </Link>
          </div>
        )}

        <div className="product__description">
          <span>{this.props.product.brand}</span>
          <span>&#160;{this.props.product.name}</span>
          <div className="product__description__price">
            {chosenCurrency}
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
});
const mapDispatchToProps = () => ({ selectCategory, selectCurrency });

export default connect(mapStateToProps, mapDispatchToProps())(Product);
