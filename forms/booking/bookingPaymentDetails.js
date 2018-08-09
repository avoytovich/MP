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
export default class PaymentDetails extends React.Component {
  render() {
    console.log('Payment Rendering');
    // console.log('this.props', this.props);
    const {inputFieldsForPaymentDetails} = bookingLabels;
    const {
      touched,
      errors,
      translate,
      handleSubmit,
      handleBack,
      handleContinue,
      setFieldValue,
      isValid,
      dirty,
    } = this.props;
    return (
      <Form onSubmit={handleSubmit} className="trip-details-form-wrapper">
        <div className="grid-header">
          <Grid className="grid-header-title" item xs={12} sm={12} container justify="space-between" alignItems="center">
            <Typography variant="title" fontSize="20px">
              {this.props.translate('addCard', 'booking')}
            </Typography>
            <Grid item xs={3} container className="cards-container" alignItems="center">
              <Grid item xs={6} className="pic-cnt" alignItems="center">
                <img className="avacard-logo" src="/static/visa-card.png" alt="visa logo"/>
              </Grid>
              <Grid item xs={6} className="pic-cnt" alignItems="center">
                <img className="card-logo" src="/static/mastercard-card.png" alt="mastercard logo"/>
              </Grid>
            </Grid>
          </Grid>
        </div>
        <Grid container>
          {inputFieldsForPaymentDetails.map((item, index) => {
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
        <div className="buttonStepTwo">
          <Button className="buttonsBookingDetails" onClick={handleBack}>
            Back
          </Button>
          <Button
            className="buttonsBookingDetails"
            onClick={handleContinue}
            // type="submit"
            // disabled={this.props.privateInfo && !dirty ? false : !isValid}
            >
            Continue
          </Button>
        </div>
      </Form>
    );
  }
}
