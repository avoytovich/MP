import React from 'react';
import Popover from '@material-ui/core/Popover';

import { TimePicker } from 'material-ui-pickers';

import Typography from '../../typography';

import './timePicker.sass';

export default class TimePickerCustom extends React.Component {
  state = {
    anchorEl: null,
  };

  get renderEndAdornment() {
    if (this.props.infoIcon) {
      return (
        <img
          src="/static/svg/ic-info-outline-24-px.svg"
          onClick={this.onIconClick}
        />
      );
    }
    return null;
  }

  onIconClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
    event.stopPropagation();
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,

    });
  };



  render() {
    const {
      field: { name, value = null, onBlur },
      id = name,
      fullWidth,
      className = '',
      touched,
      label,
      maxDate,
      placeholder,
      disabled,
      infoIcon,
      error,
      setFieldValue,
    } = this.props;
    return (
      <div className="time-picker-wrapper">
        <TimePicker
          clearable
          ampm={false}
          id={id}
          name={name}
          fullWidth={fullWidth}
          onBlur={onBlur}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          error={!!error}
          label={error || label}
          maxDate={maxDate}
          keyboardIcon={this.renderEndAdornment}
          // handle clearing outside => pass plain array if you are not controlling value outside
          // mask={val => (val ? [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/] : [])}
          value={value}
          onChange={val => setFieldValue(name, val)}
        />
        {infoIcon && (
          <Popover
            open={Boolean(this.state.anchorEl)}
            anchorEl={this.state.anchorEl}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}>
            <Typography>The content of the Popover.</Typography>
          </Popover>
        )}
      </div>
    );
  }
}
