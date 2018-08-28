import React from 'react';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Close from '@material-ui/icons/Close';

import Input from '@material-ui/core/Input';
import Popover from '@material-ui/core/Popover';
import moment from 'moment';

import Typography from '../../typography';

import './inputStyles.sass';

export default class InputCustom extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  state = {
    anchorEl: null,
    focused: false,
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
    if (this.props.infoReset) {
      return <Close className="icon pointer" onClick={this.onResetClick} />;
    }
    return null;
  }

  onIconClick = event => {
    event.stopPropagation();
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  onResetClick = event => {
    event.stopPropagation();
    location.reload();
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  focus = () => this.setState({ focused: true });

  blur = e => {
    this.setState({ focused: false });
    this.props.field.onBlur ? this.props.field.onBlur(e) : () => {};
  };

  render() {
    const {
      field: { name, value = '', onChange },
      id = name,
      fullWidth,
      className = '',
      touched,
      type,
      infoIcon,
      formHelper,
      placeholder,
      multiline,
      date,
      disabled,
      onClick,
      error,
    } = this.props;
    return (
      <FormControl
        className={
          'input-custom ' + className + (touched && error ? ' error' : '')
        }
        aria-describedby="control-size"
        fullWidth={fullWidth}>
        <InputLabel error={!!(touched && error)}>
          {!value && this.labelValue}
        </InputLabel>
        <Input
          id={id}
          value={date && value ? moment(value).format('DD.MM.YYYY') : value}
          name={name}
          onClick={onClick}
          multiline={multiline}
          placeholder={placeholder}
          disabled={disabled}
          inputRef={this.input}
          fullWidth={fullWidth}
          onChange={onChange}
          endAdornment={this.renderEndAdornment}
          onBlur={this.blur}
          onFocus={this.focus}
          type={type}
        />
        {formHelper &&
          this.state.focused && (
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
