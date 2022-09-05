import React, { PureComponent } from 'react';
import ProductListClothesWithData from '../components/withData/ProductListClothesWithData';
import ProductListTechWithData from '../components/withData/ProductListTechWithData';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/slices/selectCategorySlice';

class Home extends PureComponent {
  render() {
    const selectedCategory = this.props.selectCategorySlice.value;
    const CATEGORY_VIEW = [
      <ProductListClothesWithData key="clotheslist" />,
      <ProductListTechWithData key="techlist" />,
    ];
    return <>{selectedCategory === 0 ? CATEGORY_VIEW : CATEGORY_VIEW[selectedCategory - 1]}</>;
  }
}
const mapStateToProps = (state) => ({
  selectCategorySlice: state.selectCategorySlice,
});
const mapDispatchToProps = () => ({ selectCategory });

export default connect(mapStateToProps, mapDispatchToProps())(Home);
