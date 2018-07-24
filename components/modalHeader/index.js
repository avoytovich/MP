import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Close from '@material-ui/icons/Close';

import Typography from '../material-wrap/typography';

import { Router } from '../../routes';

import './styles.sass';

export default class ModalHeader extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onClose: PropTypes.func,
  };

  static defaultProps = {
    onClose: () => Router.back(),
  };

  render() {
    return (
      <div className="modal-header-wrapper">
        <div className="title-wrapper">
          <Typography fontSize="24px" variant="title">{this.props.title}</Typography>
        </div>
        <Close className="icon pointer" onClick={this.props.onClose} />
      </div>
    );
  }
}
