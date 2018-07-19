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
  account,
} from '../../../../services/cruds';
import loading from '../../../../services/decorators/loading';

import './email.sass';
import { setLocale } from '../../../../services/serverService';

const mapStateToProps = ({ runtime }) => ({
  signUpInfoData: runtime.signUpInfoData || {},
});

@loading()
@i18n()
@connect(mapStateToProps)
export default class EmailModal extends Component {
  componentDidMount() {
    console.log(this.props);
  }

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
    this.saveToStorage(res);
  };

  saveToStorage = async res => {
    setLocale('id_token', res.data.id_token);
    setLocale('refresh_token', res.data.refresh_token);
    const accoutResp = await this.props.loadData(account.get(), {
      unsetLoading: false,
    });
    if (accoutResp.data.authorities.indexOf('ROLE_SHOPPER') !== -1) {
      Router.pushRoute('/shoper');
      this.props.setLoader(false);
    } else {
      Router.pushRoute('/profashional');
      this.props.setLoader(false);
    }
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
      lastName: values.secondName,
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
