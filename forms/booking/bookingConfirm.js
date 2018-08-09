import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';

import { Router } from '../../routes';

import Input from '../../components/material-wrap/form/input/index';
import Button from '../../components/material-wrap/button';

import { setData } from '../../actions/updateData';
import i18n from '../../services/decorators/i18n';
import { bookingLabels } from '../../constants/bookingLabels';
import { PrivateInfoSchemaStepOne } from '../../services/validateSchemas';

import './bookingDetails.sass';
import Typography from "../../components/material-wrap/typography";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

@withRouter
@connect(
  null,
  mapDispatchToProps,
)
@withFormik({
  handleSubmit: (values, options) => {
    options.props.handleSubmit(values, options);
  },

  validationSchema: props => PrivateInfoSchemaStepOne,
})
@i18n('errors', 'booking')
export default class Confirm extends React.Component {
  render() {
    console.log('this.props', this.props);
    const { inputFieldsForConfirm} = bookingLabels;
    const {
      touched,
      errors,
      translate,
      handleSubmit,
      handleBack,
      setFieldValue,
      isValid,
      dirty,
    } = this.props;

    return (
      <Form onSubmit={handleSubmit} className="trip-details-form-wrapper">
        <Grid container>
          {inputFieldsForConfirm.map((item, index) => {
            const { component, name, sm} = item;
            return (
              <Grid
                key={index}
                className="grid-field-input-gap"
                item
                xs={12}
                sm={sm || 6}>
                <Field
                  {...item}
                  component={component || Input}
                  fullWidth

                  setFieldValue={
                    // [...this.initialValues]
                    setFieldValue
                  }
                  error={translate(errors[name])}
                  touched={touched[name]}
                  className="default-input "
                />
              </Grid>
            );
          })}
        </Grid>

        <div className="buttonStepTwo">
          <Button className="buttonsBookingDetails" onClick={handleBack}>
            Back
          </Button>
          <Button
            onClick={this.props.handleSubmit}
            className="buttonsBookingDetails"
            type="submit"
            // disabled={this.props.privateInfo && !dirty ? false : !isValid}
          >
            Book
          </Button>
        </div>
      </Form>
    );
  }
}
