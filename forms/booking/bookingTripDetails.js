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
import { tripDetailsValidation } from './tripDetailsValidation';

import './bookingDetails.sass';
import Typography from '../../components/material-wrap/typography';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

@connect(
  null,
  mapDispatchToProps,
)
@withFormik({
  handleSubmit: (values, options) => {
    options.props.handleSubmit(values, options);
  },

  validate: tripDetailsValidation,
})
@i18n('errors', 'booking')
export default class TripDetails extends React.Component {
  render() {
    const {
      inputFieldsForTripDetails1,
      inputFieldsForTripDetails2,
    } = bookingLabels;
    const {
      touched,
      errors,
      translate,
      handleSubmit,
      handleContinue,
      setFieldValue,
      isValid,
      dirty,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} className="trip-details-form-wrapper">
        <div className="grid-header">
          <Grid className="grid-header-title" item xs={12} sm={12}>
            <Typography variant="title" fontSize="20px">
              {this.props.translate('where', 'booking')}
            </Typography>
          </Grid>
        </div>
        <Grid container>
          {inputFieldsForTripDetails1.map((item, index) => {
            const { component, name, sm, additionalClass } = item;
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
                    /* ...this.initialValues ||*/
                    setFieldValue
                  }
                  error={translate(errors[name])}
                  touched={touched[name]}
                  className={`default-input ${additionalClass}`}
                />
              </Grid>
            );
          })}
        </Grid>
        <div className="grid-header">
          <Grid className="grid-header-title" item xs={12} sm={12}>
            <Typography variant="title" fontSize="20px">
              {this.props.translate('who', 'booking')}
            </Typography>
          </Grid>
        </div>
        <Grid container>
          {inputFieldsForTripDetails2.map((item, index) => {
            const { component, name, sm, additionalClass } = item;
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
                    /* ...this.initialValues ||*/
                    setFieldValue
                  }
                  error={translate(errors[name])}
                  touched={touched[name]}
                  className={`default-input ${additionalClass}`}
                />
              </Grid>
            );
          })}
        </Grid>
        <div className="cancellation-policy-container">
          <Grid item xs={12} sm={12}>
            <Typography variant="subheading" fontSize="16px">
              {this.props.translate('learnmore', 'booking')}
              <a href="#">
                {this.props.translate('learnmoreclick', 'booking')}
              </a>
            </Typography>
          </Grid>
        </div>
        <div className="buttons-cnt buttonStepOne">
          <Button
            // onClick={handleSubmit}
            // onClick={handleContinue}
            className="buttonsBookingDetails"
            type="submit"
            disabled={this.props.bookingInfo && !dirty ? false : !isValid}>
            {this.props.translate('continue', 'booking')}
          </Button>
        </div>
      </Form>
    );
  }
}
