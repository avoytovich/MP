import React from 'react';
import Popover from '@material-ui/core/Popover';

import { DatePicker } from 'material-ui-pickers';

import Typography from '../../typography';
import Input from '../input';

import './datePicker.sass';

export default class DatePickerCustom extends React.Component {
  constructor(props) {
    super(props);
    this.calendar = React.createRef();
  }
  state = {
    anchorEl: null
  };

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

  openCalendar = () => {
    this.calendar.current.open();
  }

  render() {
    const {
      field: { name, value = '', onBlur },
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
        <Input
          id={id}
          field={{ name, value }}
          infoIcon={infoIcon}
          fullWidth={fullWidth}
          placeholder={placeholder}
          className={className}
          onClick={this.openCalendar}
          disabled={disabled}
          error={!!(touched && error)}
          label={error || label}
          maxDate={maxDate}
          date
          format="DD.MM.YYYY"
          value={value}
          onChange={val => setFieldValue(name, val)}
        />
        <DatePicker
          id={id}
          name={name}
          fullWidth={fullWidth}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          ref={this.calendar}
          style={{ display: 'none' }}
          error={!!(touched && error)}
          label={error || label}
          maxDate={maxDate}
          format="DD.MM.YYYY"
          keyboardIcon={this.renderEndAdornment}
          // handle clearing outside => pass plain array if you are not controlling value outside
          // mask={val => (val ? [/\d/, /\d/, '.', /\d/, /\d/, '.', /\d/, /\d/, /\d/, /\d/] : [])}
          value={value}
          onChange={val => setFieldValue(name, val)}
          onBlur={onBlur}
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
