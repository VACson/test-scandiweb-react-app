import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartItem } from '../../redux/slices/cartSlice';

class Button extends Component {
  onClick = () => {
    const currentAttributes = this.props.attributes;
    const id = this.props.id;
    this.props.updateCartItem({
      [id]: {
        id: id,
        count: 1,
        attributes: currentAttributes,
      },
    });
  };
  render() {
    console.log(this.props.count);
    return (
      <button className="button button__addToCart fs-16 fw-600" onClick={this.onClick}>
        ADD TO CART
      </button>
    );
  }
}
const mapStateToProps = (state) => ({
  cartSlice: state.cartSlice,
});
const mapDispatchToProps = () => ({ updateCartItem });

export default connect(mapStateToProps, mapDispatchToProps())(Button);
