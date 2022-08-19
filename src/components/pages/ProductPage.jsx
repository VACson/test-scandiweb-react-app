import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';
import { selectProduct } from '../../redux/slices/selectProductSlice';
import { withRouter } from 'react-router';

import ProductFull from '../components/ProductFull';
class ProductPage extends PureComponent {
  render() {
    const productId = this.props.match.params.slug;
    return <ProductFull ID={productId} currency={this.props.selectCurrencySlice.symbol} />;
  }
}
const mapStateToProps = (state) => ({
  selectProductSlice: state.selectProductSlice,
  selectCurrencySlice: state.selectCurrencySlice,
});
const mapDispatchToProps = () => ({ selectProduct, selectCurrency });
export default connect(mapStateToProps, mapDispatchToProps())(withRouter(ProductPage));
