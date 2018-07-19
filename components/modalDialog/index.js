import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import Typography from '../material-wrap/typography';

class ConfirmationDialog extends React.Component {

  state = {
    open: false,
  };

  render() {
    const { confirmCancel, confirmOk } = this.props;
    return (
      <div>
        <DialogContent>
          <Typography variant="subheading" fontSize="24px">
            Do you really want to close registration process?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmOk} color="primary">
            Ok
          </Button>
        </DialogActions>
      </div>
    );
  }
}

export default ConfirmationDialog;
