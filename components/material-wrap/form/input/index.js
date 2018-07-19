import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

import './inputStyles.sass';

export default class InputCustom extends React.Component {
  get labelValue() {
    if (this.props.touched && this.props.error) {
      return this.props.error;
    }
    return this.props.label;
  }

  render() {
    const {
      field: { name, value, onBlur, onChange },
      id = name,
      fullWidth,
      className = '',
      touched,
      type,
      disabled,
      error,
    } = this.props;
    return (
      <FormControl
        className={
          'input-custom ' + className + (touched && error ? ' error' : '')
        }
        fullWidth={fullWidth}>
        <InputLabel error={!!(touched && error)}>{this.labelValue}</InputLabel>
        <Input
          id={id}
          value={value}
          name={name}
          disabled={disabled}
          fullWidth={fullWidth}
          onChange={onChange}
          onBlur={onBlur}
          type={type}
        />
      </FormControl>
    );
  }
}
