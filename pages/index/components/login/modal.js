import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

import Grid from '@material-ui/core/Grid';

import { Router } from '../../../../routes';

import { createNotification } from '../../../../services/notification';
import i18n from '../../../../services/decorators/i18n';
import { setLocale } from '../../../../services/serverService';
import { updateSpecData } from '../../../../actions/updateData';

import LoginForm from '../../../../forms/login/index';
import Typography from '../../../../components/material-wrap/typography';
import Social from '../../../../constants/social';
import { authenticate, account, socialLogin } from '../../../../services/cruds';

import './login.scss';

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateSpecData }, dispatch);

@i18n()
@connect(
  null,
  mapDispatchToProps,
)
export default class LoginModal extends Component {
  responseFacebook = data => {
    if (data.accessToken) this.socialLoginFunc(data, 'facebook');
  };

  responseGoogle = data => {
    if (data.accessToken) this.socialLoginFunc(data, 'google');
  };

  socialLoginFunc = async (data, type) => {
    try {
      const res = await socialLogin.post(
        {
          accessToken: data.accessToken,
        },
        `/${type}`,
      );
      this.saveToStorage(res);
    } catch (e) {
      this.props.updateSpecData({ socialData: data, type }, 'signUpInfo');
      Router.pushRoute('/user');
    }
  };

  emailLogin = async values => {
    try {
      const res = await authenticate.post({
        username: values.email,
        password: values.password,
      });
      this.saveToStorage(res);
    } catch (e) {
      createNotification({
        type: 'error',
        title: e.toString(),
        message: 'KURWA',
      });
      console.error(e);
    }
  };

  saveToStorage = async res => {
    setLocale('id_token', res.data.id_token);
    setLocale('refresh_token', res.data.refresh_token);
    const accoutResp = await account.get();
    if (accoutResp.data.authorities.indexOf('ROLE_SHOPPER') !== -1) {
      Router.pushRoute('/shoper');
    } else {
      Router.pushRoute('/profashional');
    }
  };

  render() {
    return (
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        className="login-modal">
        <Typography variant="title" fontSize="24px" className="header">
          Welcome to MyProfashional!
        </Typography>
        <LoginForm handleSubmit={this.emailLogin} />
        <p className="or-section">
          <Typography variant="button" fontSize="12px">
            or
          </Typography>
        </p>
        <FacebookLogin
          appId={Social.FacebookAppId}
          fields="first_name,last_name,email,picture"
          callback={this.responseFacebook}
          render={renderProps => (
            <button
              onClick={renderProps.onClick}
              className="facebook social-button">
              <img src="static/svg/facebook.svg" className="icon" />
              <Typography variant="button" className="social-button-with-icon">
                log in with Facebook
              </Typography>
            </button>
          )}
        />
        <GoogleLogin
          clientId={Social.GoogleClientId}
          className="def-mp-button social-button google"
          onSuccess={this.responseGoogle}>
          <img src="static/svg/google.svg" className="icon" />
          <Typography variant="button" className="social-button-with-icon">
            log in with Google
          </Typography>
        </GoogleLogin>
      </Grid>
    );
  }
}
