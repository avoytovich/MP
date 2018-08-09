import React, { Component } from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import Close from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import { get, omit } from 'lodash';

import Gallary from './gallary';

import './gallery.sass';

export default function withGallery(runtimeName, pathToGallery) {
  return function(Child) {
    const mapStateToProps = ({ runtime }) => {
      const returnObj = {
        photos: get(runtime, `${runtimeName}Data.${pathToGallery}`),
      };
      return returnObj;
    };

    @injectIntl
    @connect(
      mapStateToProps,
      null,
    )
    class Gallery extends Component {
      state = {
        open: false,
        index: null,
      };

      handleOpen = index => {
        this.setState({ open: true, index: index });
      };

      handleClose = () => {
        this.setState({ open: false });
      };

      render() {
        return (
          <div>
            <Modal open={this.state.open} onClose={this.handleClose}>
              <div className="modal-gallery-wrapper">
                <div className="close-wrapper pointer">
                  <Close onClick={this.handleClose} />
                </div>
                <Gallary
                  runtimeName={runtimeName}
                  photos={this.props.photos}
                  index={this.state.index}
                />
              </div>
            </Modal>
            <Child
              {...omit(this.props, runtimeName)}
              openGal={this.handleOpen}
              closeGal={this.handleClose}
            />
          </div>
        );
      }
    }
    return Gallery;
  };
}
