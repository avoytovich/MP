import React from 'react';
import Grid from '@material-ui/core/Grid';

import Stepper from '../../../components/stepper/index';
import ModalHeader from '../../../components/modalHeader';
import Typography from '../../../components/material-wrap/typography';
import PrivateInfo from '../../../forms/privateInfo';

import './private-info.sass';

export default class PrivateInfoProfashional extends React.Component {
  /* constructor(props) {
    super(props);
    this.state = {
      private-info: true,
    };
  }*/

  handleSubmit = values => {
    console.log('values', values);
  };

  render() {
    return (
      <div className="private-info">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12}>
            <ModalHeader title="Private Info" className="test" />
            <div className="grid-stepper">
              <Grid className="grid" item xs={12} sm={10}>
                <Stepper />
              </Grid>
            </div>
            <div className="grid-header">
              <Grid className="grid-header-title" item xs={12} sm={10}>
                <Typography variant="title" fontSize="20px">
                  Please provide your Private information
                </Typography>
              </Grid>
            </div>
            <div className="grid-field">
              <Grid className="grid-field-input" item xs={12} sm={10}>
                <PrivateInfo handleSubmit={this.handleSubmit} />
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
