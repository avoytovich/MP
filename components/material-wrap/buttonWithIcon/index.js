import React from 'react';
import PropTypes from 'prop-types';
import { omit } from 'lodash';

import Button from '@material-ui/core/Button';

import Typography from '../typography';

import './style.sass';

export default class OurButtonWithIcon extends React.Component {
  static propTypes = {
    variant: PropTypes.string,
    className: PropTypes.string,
    icon: PropTypes.node.isRequired,
    onClick: PropTypes.func,
  };

  static defaultProps = {
    variant: 'outlined',
    className: '',
  };

  render() {
    return (
      <Button
        {...omit(this.props, 'className')}
        className={'def-icon-button ' + this.props.className}
        variant="contained"
        color="default">
        {this.props.icon}
        <Typography variant="button">{this.props.children}</Typography>
      </Button>
    );
  }
}
