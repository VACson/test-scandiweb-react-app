// {
// <div className="currencies header--item" onClick={this.popupClick}>
// {selectedCurrency}
// <div className="currencies__arrow">&#5167;</div>{' '}
// </div>
// <div className="currencies__popup" onClick={this.popupClick}>
// {/* <div onClick={this.onClick}>{this.currencies[0].label}</div> */}
// {this.state.isOpen
//   ? this.currencies.map((currency, index) => (
//       <div
//         className="currencies__popup__item"
//         key={currency.label}
//         // onClick={() => this.props}
//       >
//         {currency.label}
//         {}
//       </div>
//     ))
//   : ''}
// </div>}
class Header extends PureComponent {
  state = {
    isOpen: false,
  };
  popupClick = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  };

  render() {
    const categoryNames = ['ALL', 'CLOTHES', 'TECH'];
    const chooseCurrency = ['$', '£', 'A$', '¥', '₽'];
    const selectedCategory = this.props.selectCategorySlice.value;

    return (
      <header className="header">
        <ul className="flex flex-row">
          {categoryNames &&
            categoryNames.map((name, index) => (
              <li
                className={
                  selectedCategory === index ? 'header--item header--item-active' : 'header--item'
                }
                onClick={() => this.props.selectCategory(index)}
                key={`${name}_${index}`}>
                {name}
              </li>
            ))}
        </ul>
        <img className="header--item header--item--logo" src={logo} width="32" alt="mainlogo" />
        <div className="flex flex-row">
          <div className="currencies header--item" onClick={this.popupClick}>
            {chooseCurrency[this.props.selectCurrencySlice.symbol]}
            <div className="currencies__arrow">&#5167;</div>{' '}
          </div>
          <div className="currencies__popup" onClick={this.popupClick}>
            {this.state.isOpen ? <Currencies /> : []}
          </div>

          <img height={16} src={cart} alt="cart-menu" />
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  selectCategorySlice: state.selectCategorySlice,
  selectCurrencySlice: state.selectCurrencySlice,
});
const mapDispatchToProps = () => ({ selectCategory, selectCurrency });

export default connect(mapStateToProps, mapDispatchToProps())(Header);
