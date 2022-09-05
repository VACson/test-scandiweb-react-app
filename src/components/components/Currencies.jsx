import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';

class Currencies extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onCurrencyClick.bind(this);
  }
  onCurrencyClick = (i) => {
    this.props.selectCurrency(i).toString();
  };
  render() {
    return (
      <div>
        {this.props.data.currencies.map((currency, index) => (
          <div
            key={currency.label}
            className="fw-500 flex flex-row currencies__popup__item"
            onClick={() => this.onCurrencyClick(index)}>
            {currency.symbol}&#160;
            {currency.label}
          </div>
        ))}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  selectCurrencySlice: state.selectCurrencySlice,
});
const mapDispatchToProps = () => ({ selectCurrency });
export default connect(mapStateToProps, mapDispatchToProps())(Currencies);
