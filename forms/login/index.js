import React from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';

import { Router } from '../../routes';

import Input from '../../components/material-wrap/form/input/index';
import Button from '../../components/material-wrap/button';
import Typography from '../../components/material-wrap/typography';

import { setData } from '../../actions/updateData';
import { LoginSchema } from '../../services/validateSchemas';
import i18n from '../../services/decorators/i18n';

import './login.scss';

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
  validationSchema: LoginSchema,
})
@i18n('errors')
export default class LoginForm extends React.Component {
  forgotClick = () => {
    Router.pushRoute('/forgot');
  };
  render() {
    const { handleSubmit, errors, touched, isValid, translate } = this.props;
    return (
      <Form className="login-form" onSubmit={handleSubmit}>
        <Field
          name="email"
          component={Input}
          fullWidth
          error={translate(errors.email)}
          touched={touched.email}
          className="default-input"
          label="Email"
        />
        <Field
          name="password"
          component={Input}
          fullWidth
          error={translate(errors.password)}
          touched={touched.password}
          className="default-input"
          type="password"
          label="Password"
        />
        <Typography
          variant="subheading"
          className="forgot pointer"
          fontSize="14px"
          onClick={this.forgotClick}>
          Forgot Password?
        </Typography>
        <Button
          disabled={!isValid}
          type="submit"
          className="social-button login-button">
          Log in
        </Button>
      </Form>
    );
  }
}
