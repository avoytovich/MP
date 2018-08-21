import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';

import { Router } from '../../routes';

import Input from '../../components/material-wrap/form/input';
import Button from '../../components/material-wrap/button';

import { setData } from '../../actions/updateData';
import { TripSchema } from '../../services/validateSchemas';
import i18n from '../../services/decorators/i18n';

import './trip.sass';

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
  validationSchema: TripSchema,
})
@i18n('errors')
export default class TripForm extends React.Component {
  render() {
    const { handleSubmit, errors, touched, isValid, translate } = this.props;
    return (
      <Form className="trip-form" onSubmit={handleSubmit}>
        <Field
          name="code"
          component={Input}
          fullWidth
          error={translate(errors.description)}
          touched={touched.description}
          label="Code"
        />
        <Button
          disabled={!isValid}
          type="submit"
          className="social-button login-button">
          OK
        </Button>
      </Form>
    );
  }
}
