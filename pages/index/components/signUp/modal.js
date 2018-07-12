import React, { Component } from 'react';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { GoogleLogin } from 'react-google-login';

import Grid from '@material-ui/core/Grid';
import Post from '@material-ui/icons/LocalPostOffice';

import i18n from '../../../../services/decorators/i18n';

import Button from '../../../../components/material-wrap/button';
import Typography from '../../../../components/material-wrap/typography';
import Social from '../../../../constants/social';

import './signUp.scss';

@i18n()
export default class SignUpModal extends Component {
  responseFacebook = data => {
    console.log(data);
  };

  responseGoogle = data => {
    console.log(data);
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
          fields="name,email,picture"
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
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}>
          <img src="static/svg/google.svg" className="icon" />
          <Typography variant="button" className="social-button-with-icon">
            sign up with Google
          </Typography>
        </GoogleLogin>
        <button className="email-login social-button">
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
        <Button className="social-button login-button">Log in</Button>
      </Grid>
    );
  }
}
