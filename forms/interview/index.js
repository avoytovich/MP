import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';

import { Router } from '../../routes';

import TextArea from '../../components/material-wrap/form/textArea';
import Button from '../../components/material-wrap/button';

import { setData } from '../../actions/updateData';
import { InterviewSchema } from '../../services/validateSchemas';
import i18n from '../../services/decorators/i18n';

import Typography from '../../components/material-wrap/typography/index';

import './interview.scss';

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
  validationSchema: InterviewSchema,
})
@i18n('errors')
export default class InterviewForm extends React.Component {
  render() {
    const { handleSubmit, errors, touched, isValid, translate } = this.props;
    return (
      <Form className="interview-form" onSubmit={handleSubmit}>
        <Typography variant="subheading" className="subheading" fontSize="16px">
          We will contact you shortly for an interview, in the meanwhile, please
          complete your profile and let us know your interview-date preferences.
        </Typography>
        <Field
          name="description"
          component={TextArea}
          error={translate(errors.description)}
          touched={touched.description}
          label="Description"
        />
        <Button
          disabled={!isValid}
          type="submit"
          className="social-button login-button">
          Send
        </Button>
      </Form>
    );
  }
}
