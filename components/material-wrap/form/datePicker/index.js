import React from 'react';

import { DatePicker } from 'material-ui-pickers';

import './datePicker.sass';

export default class DatePickerCustom extends React.Component {
  render() {
    const {
      field: { name, value = '', onChange },
      id = name,
      fullWidth,
      className = '',
      touched,
      label,
      placeholder,
      disabled,
      error,
    } = this.props;
    return (
      <DatePicker
        id={id}
        disabled={disabled}
        onChange={onChange}
        fullWidth={fullWidth}
        format="dd.mm.yyyy"
        label={error || label}
        error={!!(touched && error)}
        name={name}
        type="date"
        value={value}
        className={className}
        InputLabelProps={{
          shrink: true,
        }}
      />
    );
  }
}
