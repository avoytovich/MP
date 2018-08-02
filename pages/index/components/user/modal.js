import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import Grid from '@material-ui/core/Grid';

import { Router } from '../../../../routes';

import i18n from '../../../../services/decorators/i18n';
import SignUpForm from '../../../../forms/signUp/index';

import Typography from '../../../../components/material-wrap/typography';
import {
  register,
  socialSignUp,
  socialLogin,
} from '../../../../services/cruds';
import { saveToStorage } from '../../../../services/saveUserAndRedirectToProfile';
import loading from '../../../../services/decorators/loading';

import './email.sass';

const mapStateToProps = ({ runtime }) => ({
  signUpInfoData: runtime.signUpInfoData || {},
});

@loading()
@i18n()
@connect(mapStateToProps)
export default class EmailModal extends Component {
  submit = async (values, { setErrors, props }) => {
    const type = this.props.signUpInfoData.type;
    const accessToken = get(
      this.props,
      'signUpInfoData.socialData.accessToken',
    );
    await this.props.loadData(this.sendRequest(type, values), {
      showError: true,
    });
    if (type === 'email') Router.pushRoute('/verify');
    else {
      this.socialLoginFunc(accessToken, type);
    }
  };

  socialLoginFunc = async (accessToken, type) => {
    const res = await this.props.loadData(
      socialLogin.post(
        {
          accessToken: accessToken,
        },
        `/${type}`,
      ),
      {
        showError: true,
        unsetLoading: false,
      },
    );
    this.props.loadData(saveToStorage(res));
  };

  sendRequest = async (type, values) => {
    if (type === 'facebook' || type === 'google') {
      return await socialSignUp.post(
        {
          firstName: values.firstName,
          lastName: values.lastName,
          acceptTermsAndConditions: values.confirm,
          accessToken: this.props.signUpInfoData.socialData.accessToken,
          profashional: values.isProfashional === 'profashional',
          shopper: values.isProfashional === 'shopper',
        },
        `/${type}`,
      );
    }
    return await register.post({
      acceptTermsAndConditions: values.confirm,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      login: values.email,
      password: values.password,
      profashional: values.isProfashional === 'profashional',
      shopper: values.isProfashional === 'shopper',
    });
  };

  getFirstName = (type, signUpInfoData) => {
    switch (type) {
      case 'facebook':
        return get(signUpInfoData, 'socialData.first_name');
      case 'google':
        return get(signUpInfoData, 'socialData.profileObj.givenName');
      default:
        return '';
    }
  };

  getLastName = (type, signUpInfoData) => {
    switch (type) {
      case 'facebook':
        return get(signUpInfoData, 'socialData.last_name');
      case 'google':
        return get(signUpInfoData, 'socialData.profileObj.familyName');
      default:
        return '';
    }
  };

  getEmail = (type, signUpInfoData) => {
    switch (type) {
      case 'facebook':
        return get(signUpInfoData, 'socialData.email');
      case 'google':
        return get(signUpInfoData, 'socialData.profileObj.email');
      default:
        return '';
    }
  };

  get initialValues() {
    const signUpInfoData = get(this.props, 'signUpInfoData') || {};
    const type = this.props.signUpInfoData.type;
    return {
      isProfashional: signUpInfoData.isProfashional || 'shopper',
      firstName: this.getFirstName(type, signUpInfoData),
      lastName: this.getLastName(type, signUpInfoData),
      email: this.getEmail(type, signUpInfoData),
    };
  }

  render() {
    return (
      <Grid
        container
        justify="center"
        direction="column"
        alignItems="center"
        className="email-modal">
        <Typography variant="title" fontSize="24px" className="header">
          First, let's create your account.
        </Typography>
        <SignUpForm
          signUpInfoData={this.props.signUpInfoData}
          {...this.initialValues}
          handleSubmit={this.submit}
        />
      </Grid>
    );
  }
}
