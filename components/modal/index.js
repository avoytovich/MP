import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

import Modal from '@material-ui/core/Modal';
import Close from '@material-ui/icons/Close';

import './modal.scss';
@injectIntl
export default class CustomModal extends Component {
  render() {
    const children = this.props.children;
    return (
      <Modal open={this.props.open} onClose={this.props.onClose}>
        <div className="modal-window">
          {this.props.withClose && (
            <div className="close-wrapper">
              <Close onClick={this.props.onClose} />
            </div>
          )}
          {children}
        </div>
      </Modal>
    );
  }
}
