import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import './style.scss';

export default class CustomTypography extends React.Component {
  static propTypes = {
    fontSize: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    fontSize: '16px',
    variant: 'button',
    className: '',
  };

  get style() {
    switch (this.props.fontSize) {
      case '16px':
        return 'default-text ';
      case '12px':
        return 'other-text ';
      case '24px':
        return 'default-header-text ';
      default:
        return 'default-text ';
    }
  }

  render() {
    return (
      <Typography
        variant={this.props.variant}
        className={this.style + this.props.className}>
        {this.props.children}
      </Typography>
    );
  }
}
