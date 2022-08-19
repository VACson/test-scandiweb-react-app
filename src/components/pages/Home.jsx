import React, { PureComponent } from 'react';
import ProductListClothes from '../components/ProductListClothes';
import ProductListTech from '../components/ProductListTech';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/slices/selectCategorySlice';
import { selectCurrency } from '../../redux/slices/selectCurrencySlice';

class Home extends PureComponent {
  render() {
    const selectedCategory = this.props.selectCategorySlice.value;
    return (
      <>
        {selectedCategory !== 2 ? <ProductListClothes /> : []}
        {selectedCategory !== 1 ? <ProductListTech /> : []}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  selectCategorySlice: state.selectCategorySlice,
  selectCurrencySlice: state.selectCurrencySlice,
});
const mapDispatchToProps = () => ({ selectCategory, selectCurrency });

export default connect(mapStateToProps, mapDispatchToProps())(Home);
