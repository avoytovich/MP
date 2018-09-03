import React, { Component } from 'react';
import InputRange from 'react-input-range';

import './style.sass';

export default class RangePicker extends Component {
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
      <InputRange
        maxValue={10}
        minValue={0}
        {...this.props}
        value={this.value}
        onChange={this.onChange()}
      />
    );
  }
}
