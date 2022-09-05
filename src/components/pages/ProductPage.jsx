import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';
import { withRouter } from 'react-router';

import ProductFullWithData from '../components/withData/ProductFullWithData';
class ProductPage extends PureComponent {
  render() {
    const productId = this.props.match.params.slug;
    return <ProductFullWithData ID={productId} currency={this.props.selectCurrencySlice.symbol} />;
  }
}
const mapStateToProps = (state) => ({
  selectCurrencySlice: state.selectCurrencySlice,
});
const mapDispatchToProps = () => ({ selectCurrency });
export default connect(mapStateToProps, mapDispatchToProps())(withRouter(ProductPage));
