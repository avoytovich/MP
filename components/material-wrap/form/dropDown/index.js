import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { updateSpecData } from '../../../../actions/updateData';

import './dropDown.sass';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpecData }, dispatch);

@connect(
  null,
  mapDispatchToProps,
)
export default class DropDownCustom extends React.Component {
  static propTypes = {
    multiple: PropTypes.bool,
    options: PropTypes.array,
  };

  static defaultProps = {
    multiple: false,
    options: [],
  };

  state = {
    optionsFromBe: [],
  };

  componentDidMount() {
    if (this.props.getFrom) {
      this.loadAndSaveToOptions();
    }
  }

  loadAndSaveToOptions = async () => {
    try {
      const response = await this.props.getFrom();
      this.setState({ optionsFromBe: response.data });
      this.props.updateSpecData(response.data, `${this.props.field.name}List`);
    } catch (e) {
      console.error(e);
    }
  };

  get labelValue() {
    if (this.props.touched && this.props.error) {
      return this.props.error;
    }
    return this.props.label;
  }

  get renderOptions() {
    const {
      field: { onBlur, name },
    } = this.props;
    const renderFrom = this.props.getFrom
      ? this.state.optionsFromBe
      : this.props.options;
    return renderFrom.map(option => (
      <MenuItem key={option.id} id={name} value={option.id} onBlur={onBlur}>
        {option.name}
      </MenuItem>
    ));
  }

  render() {
    const {
      multiple,
      field: { name, value = multiple ? [] : '', onChange },
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
          'drop-down-custom ' + className + (touched && error ? ' error' : '')
        }
        fullWidth={fullWidth}>
        <InputLabel error={!!(touched && error)}>{this.labelValue}</InputLabel>
        <Select
          id={id}
          value={value}
          name={name}
          multiple={multiple}
          disabled={disabled}
          fullWidth={fullWidth}
          onChange={onChange}
          type={type}>
          {this.renderOptions}
        </Select>
      </FormControl>
    );
  }
}
