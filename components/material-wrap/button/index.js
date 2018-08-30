import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

import Button from '@material-ui/core/Button';

import Typography from '../typography';

import './buttonStyle.sass';

export default class OurButton extends React.Component {
  static propTypes = {
    variant: PropTypes.string,
    className: PropTypes.string,
    buttonFontSize: PropTypes.string,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    variant: 'outlined',
    buttonFontSize: '16px',
    className: '',
  };

  render() {
    return (
      <Button
        {...omit(this.props, 'className')}
        className={'def-mp-button ' + this.props.className}>
        <Typography variant="button" fontSize={this.props.buttonFontSize}>
          {this.props.children}
        </Typography>
      </Button>
    );
  }
}
