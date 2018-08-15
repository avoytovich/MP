import React, { Component } from 'react';
import { injectIntl } from 'react-intl';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import i18n from '../../../services/decorators/i18n';
import Button from '../../../components/material-wrap/button';

export default function withConfirmModal(
  confirmText,
  cancelText,
  okText,
  onOk,
) {
  return function(Child) {
    @i18n('confirmModal')
    class CustomConfirmModal extends Component {
      ok = undefined;

      state = {
        open: false,
      };

      handleOpen = ok => {
        this.ok = ok;
        this.setState({ open: true });
      };

      handleClose = () => {
        this.setState({ open: false });
      };

      render() {
        return (
          <>
            <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                {this.props.translate('confirm')}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.props.translate(confirmText)}
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  {this.props.translate(cancelText)}
                </Button>
                <Button
                  onClick={() => {
                    if (onOk) onOk(this.props);
                    if (this.ok) this.ok();
                    this.handleClose();
                  }}
                  color="primary">
                  {this.props.translate(okText)}
                </Button>
              </DialogActions>
            </Dialog>
            <Child
              {...this.props}
              translate={this.translate}
              openConfirm={this.handleOpen}
              closeConfirm={this.handleClose}
            />
          </>
        );
      }
    }
    return CustomConfirmModal;
  };
}
