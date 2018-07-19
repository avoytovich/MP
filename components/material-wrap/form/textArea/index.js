import React from 'react';

import Typography from '../../typography';

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
    } = this.props;
    return (
      <div>
        <div className={className}>
          <textarea
            color="primary"
            className="text-area-default"
            value={value}
            name={name}
            onBlur={onBlur}
            id={id}
            onChange={onChange}
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
