import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DatePicker } from 'material-ui-pickers';
import Popover from '@material-ui/core/Popover';

import Typography from '../../typography';
import Input from '../input';

import './datePicker.sass';
import { setData, updateSpecData } from '../../../../actions/updateData';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpecData, setData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  initialDate: runtime.dateNew,
  initialReset: runtime.resetNew,
  // profashionalPrivateInfo: runtime.profashionalPrivateInfoData,
});

@connect(
  mapStateToProps,
  mapDispatchToProps,
)
export default class DatePickerCustom extends React.Component {
  constructor(props) {
    super(props);
    this.calendar = React.createRef();
  }
  state = {
    anchorEl: null,
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
  };

  render() {
    const { initialDate } = this.props;
    const {
      field: { name, value = initialDate || '', onBlur },
      id = name,
      fullWidth,
      className = '',
      touched,
      label,
      maxDate,
      placeholder,
      disabled,
      infoIcon,
      infoReset,
      initialReset,
      error,
      onResetClick,
      setFieldValue,
    } = this.props;
    return (
      <div>
        <Input
          id={id}
          field={{ name, value }}
          infoIcon={infoIcon}
          infoReset={(!infoIcon && initialReset) || infoReset}
          fullWidth={fullWidth}
          placeholder={placeholder}
          className={className}
          onClick={this.openCalendar}
          disabled={disabled}
          error={!!(touched && error)}
          label={error || label}
          maxDate={maxDate}
          onResetClick={onResetClick}
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
          onChange={val => {
            setFieldValue(name, val);
            this.props.setData(val, 'dateNew');
            this.props.setData(true, 'resetNew');
          }}
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
