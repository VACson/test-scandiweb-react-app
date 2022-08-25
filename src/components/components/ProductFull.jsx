import React, { PureComponent } from 'react';
import classNames from 'classnames';

import gql from 'graphql-tag';
import { graphql, Query } from 'react-apollo';

import Button from './Button';

const getBooksQuery = gql`
  query getProd($id: String!) {
    product(id: $id) {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          id
          value
        }
      }
      prices {
        currency {
          symbol
          label
        }
        amount
      }
      brand
    }
  }
`;
class ProductFullWithQuery extends PureComponent {
  render() {
    console.log(this.props);
    return (
      <Query query={getBooksQuery} variables={{ id: this.props.ID }}>
        {({ loading, error, data }) => {
          if (loading) return <p>{console.log('Loading')}</p>;
          if (error) return <p>{console.log(error)}</p>;
          return <ProductFull data={this.props.data} currency={this.props.currency} />;
        }}
      </Query>
    );
  }
}
class ProductFull extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentImage: 0,
      currentRadio: {},
    };
  }
  createMarkup() {
    return { __html: this.props.data.product.description };
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      currentRadio: {
        ...prevState.currentRadio,
        [name]: value,
      },
    }));
  };
  componentDidMount() {
    console.log('mount');
    if (this.props.data.product) {
      this.props.data.product.attributes.map((attribute) => {
        this.setState((prevState) => ({
          currentRadio: {
            ...prevState.currentRadio,
            [attribute.id]: attribute.items[0].value,
          },
        }));
        console.log('did');
      });
    }
  }
  render() {
    console.log(this.props.data);
    console.log(this.state);
    const chooseCurrency = ['$', '£', 'A$', '¥', '₽'];
    return (
      // <Query query={getBooksQuery}>
      //   {({ loading, error, data }) => {
      //     if (loading) return <p>{console.log('Loading')}</p>;
      //     if (error) return <p>{console.log(error)}</p>;

      //     return (
      <div className="productpage__container">
        <div className="flex flex-column">
          {this.props.data.product.gallery.map((gallery, index) => {
            return (
              <img
                src={gallery}
                width={80}
                key={index}
                onClick={() => this.setState(() => ({ currentImage: index }))}
                alt={gallery}
                style={{ objectFit: 'cover' }}
              />
            );
          })}
        </div>
        <img
          src={this.props.data.product.gallery[this.state.currentImage]}
          width={610}
          height={511}
          className="productpage__container__img"
          alt="main"
        />

        <div className="flex flex-column productpage__container__sidetext">
          <div className="flex--full">
            <div className="fs-30 fw-600 mb-16">{this.props.data.product.name}</div>
            <div className="fs-24 fw-400 mb-44">{this.props.data.product.brand}</div>
          </div>
          {this.props.data.product.attributes.map((attribute, index) => {
            const attributeIndex = index;

            if (this.props.data.product.attributes[attributeIndex].type === 'swatch') {
              return (
                <div
                  className="flex--full"
                  key={this.props.data.product.attributes[attributeIndex].name}>
                  <div className="fs-18 fw-700 roboto mb-8">
                    {this.props.data.product.attributes[attributeIndex].name}:
                  </div>
                  <div className="flex">
                    {this.props.data.product.attributes[attributeIndex].items.map(
                      (items, index) => {
                        return (
                          <label
                            className={classNames('colorpick  fs-16 fw-400', {
                              'colorpick--active': this.state.currentRadio.Color === items.value,
                            })}
                            key={this.props.data.product.attributes[attributeIndex].name.concat(
                              items.value,
                            )}
                            onClick={this.handleChange}
                            style={{
                              backgroundColor: `${items.value}`,
                            }}
                            htmlFor={this.props.data.product.attributes[attributeIndex].id__name}>
                            <input
                              type="radio"
                              id={this.props.data.product.attributes[attributeIndex].id__name}
                              className="radio"
                              onChange={this.handleChange}
                              name={this.props.data.product.attributes[attributeIndex].name}
                              value={items.value}
                              defaultChecked={index === 0}></input>
                          </label>
                        );
                      },
                    )}
                  </div>
                </div>
              );
            } else if (this.props.data.product.attributes[attributeIndex].type === 'text') {
              return (
                <div
                  className="flex--full"
                  key={this.props.data.product.attributes[attributeIndex].name.concat(
                    this.props.data.product.attributes[attributeIndex].name,
                  )}>
                  <div className="fs-18 fw-700 roboto mb-8">
                    {this.props.data.product.attributes[attributeIndex].name}:
                  </div>
                  <div className="flex">
                    {this.props.data.product.attributes[attributeIndex].items.map(
                      (items, index) => {
                        var name = `${this.props.data.product.attributes[attributeIndex].name}`;
                        return (
                          <label
                            className={classNames('sizepick fs-16 fw-400', {
                              'sizepick--active': this.state.currentRadio[name] === items.value,
                            })}
                            key={items.id.concat(name.concat(items.value))}
                            htmlFor={items.id__name}>
                            <input
                              className="radio"
                              type="radio"
                              id={items.id__name}
                              value={items.value}
                              name={this.props.data.product.attributes[attributeIndex].name}
                              onChange={this.handleChange}
                              defaultChecked={index === 0}></input>
                            {items.value}
                          </label>
                        );
                      },
                    )}
                  </div>
                </div>
              );
            }
          })}{' '}
          <div className="flex--full roboto fs-18 fw-700 mt-36 mb-10">Price:</div>
          <div className="product__description__price flex--full fs-24 fw-700">
            {chooseCurrency[this.props.currency]}
            {this.props.data.product.prices[this.props.currency].amount}
          </div>
          <Button
            attributes={this.state.currentRadio}
            id={this.props.data.product.id}
            price={this.props.data.product.prices}
            count={1}>
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
export default graphql(getBooksQuery, {
  options: (props) => {
    return {
      variables: {
        id: props.ID,
      },
    };
  },
})(ProductFullWithQuery);
