import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Grid from '@material-ui/core/Grid';

import { Router } from '../../../../routes';

import i18n from '../../../../services/decorators/i18n';
import { updateSpecData } from '../../../../actions/updateData';

import ForgotForm from '../../../../forms/forgot';
import Typography from '../../../../components/material-wrap/typography';
import { resetPassword } from '../../../../services/cruds';

import './forgot.sass';

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateSpecData }, dispatch);

@i18n()
@connect(
  null,
  mapDispatchToProps,
)
export default class ForgotModal extends Component {
  forgot = async values => {
    try {
      await resetPassword.post(values.email, '/init');
      Router.pushRoute('/');
    } catch (e) {
      console.error(e);
    }
  };

  back = () => {
    Router.pushRoute('/login');
  };

  render() {
    return (
      <div className="forgot-wrapper">
        <Grid
          container
          justify="center"
          direction="column"
          alignItems="center"
          className="forgot-modal">
          <Typography variant="title" fontSize="24px" className="header">
            Please enter your email address and we'll send you a link to reset
            your password.
          </Typography>
          <ForgotForm handleSubmit={this.forgot} />
        </Grid>
        <div className="line">
          <Typography
            variant="title"
            fontSize="16px"
            onClick={this.back}
            className="back-to-login pointer">
            Back to LOG IN
          </Typography>
        </div>
      </div>
    );
  }
}
