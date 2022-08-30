import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { selectCategory } from '../../redux/slices/selectCategorySlice';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';

import cartCircle from '../../assets/img/Common.svg';

class Product extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHover: false,
    };
    this.onHover = this.onHover.bind(this);
    this.stopHover = this.stopHover.bind(this);
  }
  onHover = () => {
    this.setState(() => ({ isHover: true }));
  };
  stopHover = () => {
    this.setState(() => ({ isHover: false }));
  };
  render() {
    const chooseCurrency = ['$', '£', 'A$', '¥', '₽'];

    const currentID = this.props.product.id;
    return (
      <div
        className="product-list--item"
        key={`product/${currentID}`}
        onMouseOver={this.onHover}
        onMouseLeave={this.stopHover}>
        <img
          className="product-block product-block--img"
          src={this.props.product.gallery[0]}
          alt={`product__${this.props.product.id}`}></img>
        {this.props.product.inStock === false ? (
          <div className="product-block--img--outofstock">OUT OF STOCK</div>
        ) : (
          ''
        )}
        {this.state.isHover && this.props.product.inStock === true ? (
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
});
const mapDispatchToProps = () => ({ selectCategory, selectCurrency });

export default connect(mapStateToProps, mapDispatchToProps())(Product);
