import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';

import Grid from '@material-ui/core/Grid';

import { Router } from '../../../../routes';

import i18n from '../../../../services/decorators/i18n';
import SignUpForm from '../../../../forms/signUp/index';

import Typography from '../../../../components/material-wrap/typography';
import { register, socialSignUp } from '../../../../services/cruds';

import './email.scss';

const mapStateToProps = ({ runtime }) => ({
  signUpInfoData: runtime.signUpInfoData || {},
});

@i18n()
@connect(mapStateToProps)
export default class EmailModal extends Component {
  submit = async (values, { setErrors, props }) => {
    const type = this.props.signUpInfoData.type;
    try {
      await this.sendRequest(type, values);
      Router.pushRoute('/verify');
    } catch (e) {
      console.log('error', e);
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
    console.log('RENDER', this.initialValues);
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
