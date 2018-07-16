import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';

import { Router } from '../../routes';

import Radio from '../../components/material-wrap/form/radio/index';
import Input from '../../components/material-wrap/form/input/index';
import Checkbox from '../../components/material-wrap/form/checkbox/index';
import Button from '../../components/material-wrap/button';

import { setData } from '../../actions/updateData';
import { SignUpSchema, SocialSignUpSchema } from '../../services/validateSchemas';
import i18n from '../../services/decorators/i18n';

import { socialLogin } from '../../services/cruds';

import './signUpForm.scss';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

@withRouter
@connect(
  null,
  mapDispatchToProps,
)
@withFormik({
  handleSubmit: (values, options) =>
    options.props.handleSubmit(values, options),

  validationSchema: props => {
    console.log('validationSchema', props.signUpInfoData);
    if (props.signUpInfoData.type !== 'email') return SocialSignUpSchema;
    return SignUpSchema;
  },
})
@i18n('errors')
export default class SignUpForm extends React.Component {
  componentDidMount() {
    const type = this.props.signUpInfoData.type;
    const accessToken = get(
      this.props,
      'signUpInfoData.socialData.accessToken',
    );
    this.loadSocialData(type, accessToken);
  }

  loadSocialData = (type, accessToken) => {
    if (!type) {
      Router.pushRoute('/');
    }
    if (type === 'facebook' || type === 'google') {
      // GOOGLE LOGIC
      socialLogin
        .post(
          {
            accessToken,
          },
          `/${type}`,
        )
        .then(() => Router.pushRoute('/profile'));
    }
  };

  get renderPasswords() {
    const { errors, touched, translate, signUpInfoData } = this.props;
    if (signUpInfoData.type === 'email') {
      return (
        <div className="two-inputs-row">
          <div className="input-column">
            <Field
              name="password"
              component={Input}
              fullWidth
              type="password"
              error={translate(errors.password)}
              touched={touched.password}
              className="default-input"
              label="Password"
            />
          </div>
          <div className="input-column">
            <Field
              name="confirmPassword"
              component={Input}
              fullWidth
              type="password"
              error={translate(errors.confirmPassword)}
              touched={touched.confirmPassword}
              className="default-input"
              label="Confirm password"
            />
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      handleSubmit,
      setFieldValue,
      errors,
      touched,
      isValid,
      translate,
      signUpInfoData,
    } = this.props;
    console.log(this.props);
    return (
      <Form className="sign-up-form" onSubmit={handleSubmit}>
        <div className="radio-group">
          <Field
            name="isProfashional"
            component={Radio}
            id="shopper"
            className="default-radio"
            setFieldValue={setFieldValue}
            label="Sign up as a Shopper"
          />
          <Field
            name="isProfashional"
            component={Radio}
            className="default-radio second-radio"
            setFieldValue={setFieldValue}
            id="profashional"
            label="Sign up as a Profashional"
          />
        </div>
        <div className="two-inputs-row">
          <div className="input-column">
            <Field
              name="firstName"
              component={Input}
              fullWidth
              error={translate(errors.firstName)}
              touched={touched.firstName}
              className="default-input first-name-input"
              label="First name"
            />
          </div>
          <div className="input-column">
            <Field
              name="lastName"
              component={Input}
              error={translate(errors.lastName)}
              touched={touched.lastName}
              fullWidth
              className="default-input"
              label="Last Name"
            />
          </div>
        </div>
        <div className="row-padding">
          <Field
            name="email"
            component={Input}
            fullWidth
            disabled={signUpInfoData.type !== 'email'}
            error={translate(errors.email)}
            touched={touched.email}
            className="default-input email-input"
            label="Email"
          />
        </div>
        {this.renderPasswords}
        <div className="radio-group checkbox">
          <Field
            name="confirm"
            component={Checkbox}
            fullWidth
            labelClassName="confirm-label"
            error={errors.confirm}
            setFieldValue={setFieldValue}
            label="I confirm to be 18+ and agree with T&C"
          />
        </div>
        <div className="footer">
          <Button disabled={!isValid} type="submit">
            NEXT
          </Button>
        </div>
      </Form>
    );
  }
}
