import React from 'react';

import Typography from '../../../components/material-wrap/typography/index';
import Stepper from '../../../components/stepper/index';
import Close from '@material-ui/icons/Close';
import Grid from '@material-ui/core/Grid';

import './private-info.sass';

export default class PrivateInfo extends React.Component {

  /*constructor(props) {
    super(props);
    this.state = {
      private-info: true,
    };
  }*/

  render() {
    return (
      <div className="privateInfo">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12}>
            <Typography
              className="typography-wrapper"
              variant="subheading"
              fontSize="24px"
            >
              Private Info
            </Typography>
            <Close
              onClick={this.handleClose}
              className="close-wrapper"
            />
            <div className="stepper">
              <Grid className="grid_stepper" item xs={12} sm={10}>
                <Stepper />
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
