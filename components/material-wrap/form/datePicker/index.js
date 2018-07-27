import React from 'react';

import TextField from '@material-ui/core/TextField';

import './datePicker.sass';

export default class DatePickerCustom extends React.Component {
  constructor(props) {
    super(props);
  }

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
      <TextField
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        onChange={onChange}
        fullWidth={fullWidth}
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
