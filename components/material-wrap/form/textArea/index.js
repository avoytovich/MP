import React from 'react';

import Typography from '../../typography';
import InputLabel from '@material-ui/core/InputLabel';

import './textArea.sass';

export default class TextArea extends React.Component {
  static defaultProps = {
    maxSize: 120,
  };

  state = {
    showError: false,
  };

  componentDidUpdate(prevProps) {
    if (this.props.error !== prevProps.error) {
      this.setState({ showError: this.props.error });
    }
  }

  render() {
    const {
      field: { name, value = '', onBlur, onChange },
      id,
      className = '',
      error,
      touched,
      placeholder,
      label,
      disabled
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
            disabled={disabled}
          />
          <div className="text-area-validate-wrapper">
            <Typography
              fontSize="12px"
              variant="subheading"
              className={
                'text-area-label error-text ' +
                (this.state.showError ? 'error' : '')
              }>
              {error}
            </Typography>
            <Typography
              fontSize="12px"
              variant="subheading"
              className={
                'text-area-label ' + (this.state.showError ? 'error' : '')
              }>
              {value.length}/{this.props.maxSize}
            </Typography>
          </div>
        </div>
      </div>
    );
  }
}
