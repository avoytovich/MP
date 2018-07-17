import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';

import { Router } from '../../routes';

import Input from '../../components/material-wrap/form/input/index';
import Button from '../../components/material-wrap/button';

import { setData } from '../../actions/updateData';
import { ForgotSchema } from '../../services/validateSchemas';
import i18n from '../../services/decorators/i18n';

import './forgot.scss';

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
  validationSchema: ForgotSchema,
})
@i18n('errors')
export default class LoginForm extends React.Component {
  render() {
    const { handleSubmit, errors, touched, isValid, translate } = this.props;
    return (
      <Form className="forgot-form" onSubmit={handleSubmit}>
        <Field
          name="email"
          component={Input}
          fullWidth
          error={translate(errors.email)}
          touched={touched.email}
          className="default-input"
          label="Email"
        />
        <Button
          disabled={!isValid}
          type="submit"
          className="social-button login-button">
          Submit
        </Button>
      </Form>
    );
  }
}
