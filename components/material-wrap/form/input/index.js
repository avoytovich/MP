import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Input from '@material-ui/core/Input';
import Popover from '@material-ui/core/Popover';

import Typography from '../../typography';

import './inputStyles.sass';

export default class InputCustom extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  state = {
    anchorEl: null,
  };

  get labelValue() {
    if (this.props.touched && this.props.error) {
      return this.props.error;
    }
    return this.props.label;
  }

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
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  render() {
    const {
      field: { name, value = '', onBlur, onChange },
      id = name,
      fullWidth,
      className = '',
      touched,
      type,
      infoIcon,
      formHelper,
      placeholder,
			multiline,
      disabled,
      error,
    } = this.props;
    return (
      <FormControl
        className={
          'input-custom ' + className + (touched && error ? ' error' : '')
        }
        aria-describedby="control-size"
        fullWidth={fullWidth}>
        <InputLabel error={!!(touched && error)}>{this.labelValue}</InputLabel>
        <Input
          id={id}
          value={value}
          name={name}
          multiline={multiline}
          placeholder={placeholder}
          disabled={disabled}
          fullWidth={fullWidth}
          onChange={onChange}
          endAdornment={this.renderEndAdornment}
          onBlur={onBlur}
          type={type}
        />
        {formHelper && (
          <FormHelperText id="control-size" error={Boolean(error)}>{`${
            value.length
          } / ${formHelper}`}</FormHelperText>
        )}
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
      </FormControl>
    );
  }
}
