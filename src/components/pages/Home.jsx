import React, { PureComponent } from 'react';
import ProductListClothes from '../components/ProductListClothes';
import ProductListTech from '../components/ProductListTech';
import { connect } from 'react-redux';
import { selectCategory } from '../../redux/slices/selectCategorySlice';

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
});
const mapDispatchToProps = () => ({ selectCategory });

export default connect(mapStateToProps, mapDispatchToProps())(Home);
