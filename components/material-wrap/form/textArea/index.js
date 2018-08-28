import React from 'react';

import Typography from '../../typography';
import InputLabel from '@material-ui/core/InputLabel';

import './textArea.sass';

export default class RadioCustom extends React.Component {
  static defaultProps = {
    maxSize: 120,
  };

  render() {
    const {
      field: { name, value = '', onBlur, onChange },
      id,
      className = '',
      error,
      touched,
      placeholder,
      label,
    } = this.props;
    return (
      <div>
        <div className={className}>
          <InputLabel className="textarea-label">{label}</InputLabel>
          <textarea
            color="primary"
            className="text-area-default"
            value={value}
            name={name}
            onBlur={onBlur}
            id={id}
            onChange={onChange}
            placeholder={placeholder}
          />
          <div className="text-area-validate-wrapper">
            <Typography
              fontSize="12px"
              variant="subheading"
              className={
                'text-area-label error-text ' +
                (touched && error ? 'error' : '')
              }>
              {error}
            </Typography>
            <Typography
              fontSize="12px"
              variant="subheading"
              className={
                'text-area-label ' + (touched && error ? 'error' : '')
              }>
              {value.length}/{this.props.maxSize}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}
