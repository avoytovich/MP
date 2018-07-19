import React, { Component } from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import { Router } from '../../../../routes';
import i18n from '../../../../services/decorators/i18n';

import Typography from '../../../../components/material-wrap/typography';
import Button from '../../../../components/material-wrap/button';

import './verify.sass';

const mapStateToProps = ({ runtime }) => ({
  signUpInfoData: runtime.signUpInfoData || {},
});

@i18n()
@connect(mapStateToProps)
export default class VerifyModal extends Component {
  goToHome = () => {
    Router.pushRoute('/');
  };

  render() {
    return (
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        className="verify-modal">
        <Typography variant="title" fontSize="24px" className="header">
          A verification email has been sent to your email address. Please click
          the link in that email to complete your registration.
        </Typography>
        <Button onClick={this.goToHome}>OK</Button>
      </Grid>
    );
  }
}
