import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { updateCartItem } from '../../redux/slices/cartSlice';

class Button extends PureComponent {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick = () => {
    this.props.updateCartItem({
      id: this.props.id,
      price: this.props.price,
      count: 1,
      attributes: this.props.attributes,
      attr: this.props.attr,
    });
  };
  render() {
    const buttonInStock = this.props.inStock ? '' : 'button__addToCart--Disabled';
    return (
      <button
        className={classNames(`button button__addToCart ${buttonInStock} fs-16 fw-600`)}
        onClick={this.onClick}>
        {this.props.inStock ? this.props.children : 'OUT OF STOCK'}
      </button>
    );
  }
}
const mapStateToProps = (state) => ({
  cartSlice: state.cartSlice,
});
const mapDispatchToProps = () => ({ updateCartItem });

export default connect(mapStateToProps, mapDispatchToProps())(Button);
