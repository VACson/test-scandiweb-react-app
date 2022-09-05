import React, { PureComponent } from 'react';
import { updateCartItem } from '../../redux/slices/cartSlice';
import { connect } from 'react-redux';
import classNames from 'classnames';

class ColorAttributes extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (name, value) => {
    this.props.updateCartItem({
      ...this.props.cartSlice[this.props.itemIndex],
      attributes: { ...this.props.cartSlice[this.props.itemIndex].attributes, [name]: value },
      attr: { ...this.props.cartSlice[this.props.itemIndex].attr },
    });
  };
  render() {
    const allAttributes = this.props.cartSlice[this.props.itemIndex].attr;
    const attributeClassname = this.props.isMini
      ? 'fs-14 fw-400 mb-8'
      : 'fs-18 fw-700 mb-8 mt-16 roboto ttu';
    const mini = this.props.isMini ? '--mini' : '';
    const attributeTypes = ['swatch', 'text'];
    return (
      <>
        {this.props.data.attributes.map((attribute, index) => {
          const attributeIndex = index;
          return (
            <div className="flex--full" key={this.props.id.concat(attribute.name)}>
              <div className={attributeClassname}>{allAttributes[attributeIndex].name}:</div>
              <div className="flex">
                {allAttributes[attributeIndex].items.map((items, index) => {
                  const swatchColor =
                    attribute.type === attributeTypes[0] ? `swatch__${items.displayValue}` : '';
                  return (
                    <label
                      className={classNames(
                        `${attribute.type}pick ${attribute.type}pick${mini} fs-16 fw-400 ${swatchColor}`,
                        {
                          [`${attribute.type}pick${mini}--active`]:
                            this.props.cartSlice[this.props.itemIndex].attributes[
                              allAttributes[attributeIndex].name
                            ] === items.value,
                        },
                      )}
                      key={allAttributes[attributeIndex].name.concat(
                        items.value.concat(this.props.id).concat(attribute.type),
                      )}
                      onClick={() =>
                        this.handleChange(allAttributes[attributeIndex].name, items.value)
                      }>
                      <input
                        type="radio"
                        className="radio"
                        name={allAttributes[attributeIndex].name}
                        value={items.value}
                        defaultChecked={index === 0}></input>
                      {attribute.type === attributeTypes[1] && items.value}
                    </label>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  cartSlice: state.cartSlice,
});
const mapDispatchToProps = () => ({ updateCartItem });
export default connect(mapStateToProps, mapDispatchToProps())(ColorAttributes);
