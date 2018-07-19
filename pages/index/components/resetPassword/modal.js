import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'next/router';

import Grid from '@material-ui/core/Grid';

import { Router } from '../../../../routes';

import i18n from '../../../../services/decorators/i18n';
import { updateSpecData } from '../../../../actions/updateData';

import ResetForm from '../../../../forms/resetPassword';
import Typography from '../../../../components/material-wrap/typography';
import { resetPassword } from '../../../../services/cruds';
import loading from '../../../../services/decorators/loading';
import { saveToStorage } from '../../../../services/saveUserAndRedirectToProfile';

import './reset.sass';

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateSpecData }, dispatch);

@loading()
@withRouter
@i18n()
@connect(
  null,
  mapDispatchToProps,
)
export default class ForgotModal extends Component {
  componentDidMount() {
    if (!this.props.router.query.key) {
      Router.pushRoute('/');
    }
  }

  reset = async values => {
    const res = await this.props.loadData(
      resetPassword.post(
        {
          key: this.props.router.query.key,
          newPassword: values.password,
        },
        '/finish',
      ),
      {
        showSuccess: 'Success',
        showError: true,
      },
    );
    this.props.loadData(saveToStorage(res), {
      showError: true,
    });
    Router.pushRoute('/');
  };

  render() {
    return (
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        className="reset-modal">
        <Typography variant="title" fontSize="24px" className="header">
          Please enter your new password
        </Typography>
        <ResetForm handleSubmit={this.reset} />
      </Grid>
    );
  }
}
