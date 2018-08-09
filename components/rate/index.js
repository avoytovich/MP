import React, { Component } from 'react';
import Rating from 'react-rating';

import './style.sass';

export default class Rate extends Component {
  render() {
    return (
      <Rating
        className="rate-wrapper"
        {...this.props}
        emptySymbol={<img src="/static/svg/unfill.svg" className="icon" />}
        fullSymbol={<img src="/static/svg/fill.svg" className="icon" />}
      />
    );
  }
}
