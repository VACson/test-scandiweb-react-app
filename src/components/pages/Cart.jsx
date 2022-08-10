import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Cart extends Component {
  render() {
    return (
      <>
        <div className="fw-700 fs-42">Cart</div>;
        <div className="emptyCart fw-400 fs-24">
          <div>Nothing here for now...&#128532;</div>
          <Link to="/">
            <div className="fs-36">Return to shop</div>
          </Link>
        </div>
      </>
    );
  }
}
