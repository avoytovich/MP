import React from 'react';
import Popover from '@material-ui/core/Popover';

import { DatePicker } from 'material-ui-pickers';

import Typography from '../../typography';

import './datePicker.sass';

export default class DatePickerCustom extends React.Component {
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
      field: { name, value = null },
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
      <div>
        <DatePicker
          id={id}
          name={name}
          fullWidth={fullWidth}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          error={!!(touched && error)}
          label={error || label}
          maxDate={maxDate}
          format="DD.MM.YYYY"
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
