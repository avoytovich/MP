import React from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import './style.sass';

export default class CustomTypography extends React.Component {
  static propTypes = {
    fontSize: PropTypes.string,
    variant: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    fontSize: '16px',
    variant: 'button',
    className: '',
  };

  get style() {
    switch (this.props.fontSize) {
      case '12px':
        return 'other-text ';
      case '14px':
        return 'other-text-big ';
      case '16px':
        return 'default-text ';
      case '18px':
        return 'default-prev-sub-header-text ';
      case '20px':
        return 'default-sub-header-text ';
      case '24px':
        return 'default-header-text ';
      case '25.2px':
        return 'big-text ';
      case '30px':
        return 'almost-big-header ';
      case '36px':
        return 'big-header ';
      default:
        return 'default-text ';
    }
  }

  render() {
    return (
      <Typography
        variant={this.props.variant}
        onClick={this.props.onClick}
        className={this.style + this.props.className}>
        {this.props.children}
      </Typography>
    );
  }
}
