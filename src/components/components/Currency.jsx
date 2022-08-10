import React, { Component } from 'react';

import { connect } from 'react-redux';
import { selectCategory } from '../../redux/slices/selectCategorySlice';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';

class Currency extends Component {
  render() {
    const symbolIndex = this.props.symbolIndex;
    return (
      <div
        className="fw-500 flex flex-row currencies__popup__item"
        onClick={() => this.props.selectCurrency(symbolIndex).toString()}>
        {this.props.currency.symbol}&#160;
        {this.props.currency.label}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  selectCategorySlice: state.selectCategorySlice,
  selectCurrencySlice: state.selectCurrencySlice,
});
const mapDispatchToProps = () => ({ selectCategory, selectCurrency });

export default connect(mapStateToProps, mapDispatchToProps())(Currency);
