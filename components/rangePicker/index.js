import React, { Component } from 'react';
import InputRange from 'react-input-range';

import './style.sass';

export default class RangePicker extends Component {
  render() {
    const {
      field: { name, value = 5 },
    } = this.props;
    return (
      <InputRange
        maxValue={10}
        minValue={0}
        name={name}
        id={name}
        {...this.props}
        value={value}
        onChange={value =>
          this.props.form.setFieldValue(this.props.field.name, value)
        }
      />
    );
  }
}
