import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

import Grid from '@material-ui/core/Grid';

import { Router } from '../../../../routes';

import i18n from '../../../../services/decorators/i18n';
import { updateSpecData } from '../../../../actions/updateData';

import Button from '../../../../components/material-wrap/button';
import Typography from '../../../../components/material-wrap/typography';
import Social from '../../../../constants/social';

import './signUp.scss';

const mapDispatchToProps = (dispatch, props) =>
  bindActionCreators({ updateSpecData }, dispatch);

@i18n()
@connect(
  null,
  mapDispatchToProps,
)
export default class SignUpModal extends Component {
  responseFacebook = data => {
    if (data.accessToken) {
      this.props.updateSpecData(
        { type: 'facebook', socialData: data },
        'signUpInfo',
      );
      Router.pushRoute('/user');
    }
  };

  responseGoogle = data => {
    if (data.accessToken) {
      this.props.updateSpecData(
        { type: 'google', socialData: data },
        'signUpInfo',
      );
      Router.pushRoute('/user');
    }
  };

  onSignUpClick = type => {
    this.props.updateSpecData({ type }, 'signUpInfo');
    Router.pushRoute('/user');
  };

  onLogin = () => {
    Router.pushRoute('/login');
  };

  render() {
    return (
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        className="sign-up-modal">
        <Typography variant="title" fontSize="24px" className="header">
          Welcome to MyProfashional!
        </Typography>
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
                sign up with Facebook
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
            sign up with Google
          </Typography>
        </GoogleLogin>
        <button
          className="email-login social-button"
          onClick={() => this.onSignUpClick('email')}>
          <img src="static/svg/post.svg" className="icon" />
          <Typography variant="button" className="social-button-with-icon">
            sign up with email
          </Typography>
        </button>
        <p className="or-section">
          <Typography variant="button" fontSize="12px">
            or
          </Typography>
        </p>
        <Button className="social-button login-button" onClick={this.onLogin}>
          Log in
        </Button>
      </Grid>
    );
  }
}
