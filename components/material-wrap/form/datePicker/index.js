import React from 'react';
import moment from 'moment';

import { DatePicker } from 'material-ui-pickers';

import './datePicker.sass';

export default class DatePickerCustom extends React.Component {
  render() {
    console.log('this.props', this.props);
    const {
      field: { name, value = moment() },
      id = name,
      fullWidth,
      className = '',
      touched,
      label,
      placeholder,
      disabled,
      error,
      setFieldValue,
    } = this.props;
    console.log('VQALUE', value);
    return (
      <DatePicker
        id={id}
        name={name}
        fullWidth={fullWidth}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        error={!!(touched && error)}
        label={error || label}
        format="DD.MM.YYYY"
        // handle clearing outside => pass plain array if you are not controlling value outside
        mask={val => (val ? [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/] : [])}
        value={value}
        onChange={val => setFieldValue(name, val)}
      />
    );
  }
}
