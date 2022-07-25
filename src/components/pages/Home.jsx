import React, { PureComponent } from 'react';
import ProductListClothes from '../components/ProductListClothes';
import ProductListTech from '../components/ProductListTech';

export default class Home extends PureComponent {
  render() {
    return (
      <>
        <ProductListClothes /> <ProductListTech />
      </>
    );
  }
}
