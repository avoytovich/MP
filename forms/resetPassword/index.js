import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';

import { Router } from '../../routes';

import Input from '../../components/material-wrap/form/input/index';
import Button from '../../components/material-wrap/button';

import { setData } from '../../actions/updateData';
import { ResetSchema } from '../../services/validateSchemas';
import i18n from '../../services/decorators/i18n';

import './reset.scss';

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
  validationSchema: ResetSchema,
})
@i18n('errors')
export default class ResetForm extends React.Component {
  componentDidMount() {
    if (!this.props.router.query.key) {
      Router.pushRoute('/');
    }
  }

  render() {
    const { handleSubmit, errors, touched, isValid, translate } = this.props;
    return (
      <Form className="reset-form" onSubmit={handleSubmit}>
        <Field
          name="password"
          component={Input}
          fullWidth
          error={translate(errors.password)}
          touched={touched.password}
          className="default-input"
          label="Password"
        />
        <Field
          name="confirmPassword"
          component={Input}
          fullWidth
          error={translate(errors.confirmPassword)}
          touched={touched.confirmPassword}
          className="default-input"
          label="Confirm Password"
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
