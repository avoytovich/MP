import React, { Component } from 'react';
import Rating from 'react-rating';
import { get } from 'lodash';

import './style.sass';

export default class Rate extends Component {
  onChange = value => {
    this.props.form.setFieldValue(this.props.field.name, value);
  };

  get value() {
    if (this.props.field) {
      return this.props.field.value;
    }
    return this.props.initialRating;
  }

  render() {
    return (
      <Rating
        className="rate-wrapper"
        {...this.props}
        onChange={this.onChange}
        initialRating={this.value}
        emptySymbol={<img src="/static/svg/unfill.svg" className="icon" />}
        fullSymbol={<img src="/static/svg/fill.svg" className="icon" />}
      />
    );
  }
}
