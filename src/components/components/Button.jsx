import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateCartItem } from '../../redux/slices/cartSlice';

class Button extends Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick = () => {
    const currentAttributes = this.props.attributes;
    const id = this.props.id;
    this.props.updateCartItem({
      [id]: {
        id: id,
        price: this.props.price,
        count: 1,
        attributes: currentAttributes,
        attr: this.props.attr,
      },
    });
  };
  render() {
    return (
      <button className="button button__addToCart fs-16 fw-600" onClick={this.onClick}>
        {this.props.children}
      </button>
    );
  }
}
const mapStateToProps = (state) => ({
  cartSlice: state.cartSlice,
});
const mapDispatchToProps = () => ({ updateCartItem });

export default connect(mapStateToProps, mapDispatchToProps())(Button);
