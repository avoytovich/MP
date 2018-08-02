import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';

import Button from '../../../components/material-wrap/button';
import Typography from '../../../components/material-wrap/typography';

import './gallery.sass';

export default function withGallery(text, onOk) {
  return function(Child) {
    @injectIntl
    class Gallery extends Component {
      state = {
        open: false,
      };

      handleOpen = () => {
        this.setState({ open: true });
      };

      handleClose = () => {
        onOk(this.props);
        this.setState({ open: false });
      };

      render() {
        return (
          <div>
            <Modal open={this.state.open} onClose={this.handleClose}>
              <div className="modal-gallery-wrapper" />
            </Modal>
            <Child
              {...this.props}
              translate={this.translate}
              openModal={this.handleOpen}
              closeModal={this.handleClose}
            />
          </div>
        );
      }
    }
    return Gallery;
  };
}
