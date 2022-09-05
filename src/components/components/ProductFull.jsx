import React, { PureComponent } from 'react';
import classNames from 'classnames';
import Button from './Button';
import { currencySymbolsData } from './constants';

class ProductFull extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: null,
      currentRadio: {},
    };
    this.createMarkup.bind(this);
  }
  createMarkup() {
    return { __html: this.props.data.product.description };
  }
  changePicture = (i) => {
    this.setState(() => ({ currentImage: i }));
  };
  handleChange = (name, value) => {
    this.setState((prevState) => ({
      currentRadio: {
        ...prevState.currentRadio,
        [name]: value,
      },
    }));
  };
  componentDidMount() {
    // set the initial state
    this.props.data.product.inStock &&
      this.props.data.product.attributes.map((attribute) => {
        return this.setState((prevState) => ({
          currentRadio: {
            ...prevState.currentRadio,
            [attribute.id]: attribute.items[0].value,
          },
        }));
      });
  }
  render() {
    const chosenCurrency = currencySymbolsData[[this.props.currency]];
    const allAttributes = this.props.data.product.attributes;
    const currentImageIndex = this.state.currentImage === null ? 0 : this.state.currentImage;

    return (
      <div className="productpage__container">
        <div className="flex flex-column sidegallery">
          {this.props.data.product.gallery.map((gallery, index) => {
            return (
              <img
                src={gallery}
                key={index}
                className="sidegallery__image"
                onClick={() => this.changePicture(index)}
                alt={gallery}
              />
            );
          })}
        </div>
        <img
          src={this.props.data.product.gallery[currentImageIndex]}
          className="productpage__container__img"
          alt="fullsizeproduct"
        />
        <div className="flex flex-column productpage__container__sidetext">
          <div className="flex--full">
            <div className="fs-30 fw-600 mb-16">{this.props.data.product.brand}</div>
            <div className="fs-24 fw-400 mb-44">{this.props.data.product.name}</div>
          </div>
          {this.props.data.product.attributes.map((attribute, index) => {
            const attributeIndex = index;
            return (
              <div
                className="flex--full mb-24"
                key={this.props.data.product.name.concat(attribute.name)}>
                <div className="fs-18 fw-700 roboto mb-8 ttu">
                  {allAttributes[attributeIndex].name}:
                </div>
                <div className="flex">
                  {allAttributes[attributeIndex].items.map((items, index) => {
                    const swatchColor =
                      attribute.type === 'swatch' ? `swatch__${items.displayValue}` : '';
                    return (
                      <label
                        className={classNames(
                          `${attribute.type}pick ${attribute.type}pick fs-16 fw-400 ${swatchColor}`,
                          {
                            [`${attribute.type}pick--active`]:
                              this.state.currentRadio[attribute.id] === items.value,
                          },
                          this.props.data.product.inStock === false &&
                            `${attribute.type}pick--disabled`,
                        )}
                        key={allAttributes[attributeIndex].name.concat(
                          items.value.concat(this.props.id).concat(attribute.name),
                        )}
                        onClick={() =>
                          this.handleChange(allAttributes[attributeIndex].name, items.value)
                        }>
                        <input
                          type="radio"
                          className={classNames(
                            'radio',
                            this.props.data.product.inStock === false && 'radio--disabled',
                          )}
                          name={allAttributes[attributeIndex].name}
                          value={items.value}
                          defaultChecked={index === 0}></input>
                        {attribute.type === 'text' && items.value}
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="flex--full roboto fs-18 fw-700 mt-14 mb-10">PRICE:</div>
          <div className="product__description__price flex--full fs-24 fw-700">
            {chosenCurrency}
            {this.props.data.product.prices[this.props.currency].amount}
          </div>
          <Button
            attributes={this.state.currentRadio}
            id={this.props.data.product.id}
            attr={this.props.data.product.attributes}
            price={this.props.data.product.prices}
            inStock={this.props.data.product.inStock}>
            ADD TO CART
          </Button>
          <div
            dangerouslySetInnerHTML={this.createMarkup()}
            className="product__description__text roboto fw-400 flex-column"></div>
        </div>
      </div>
    );
  }
}
export default ProductFull;
