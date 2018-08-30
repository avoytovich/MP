import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withFormik, Form, Field } from 'formik';
import { withRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  Elements,
  injectStripe,
} from 'react-stripe-elements';

import { Router } from '../../routes';

import Input from '../../components/material-wrap/form/input/index';
import Button from '../../components/material-wrap/button';

import { setData } from '../../actions/updateData';
import i18n from '../../services/decorators/i18n';
import { bookingLabels } from '../../constants/bookingLabels';
import { PaymentDetailsSchema } from '../../services/validateSchemas';
import CheckoutForm from './checkoutForm';
import InjectedCardForm from './cardForm';

import './bookingDetails.sass';
import Typography from '../../components/material-wrap/typography';

const mapDispatchToProps = dispatch =>
  bindActionCreators({ setData }, dispatch);

const createOptions = () => {
  return {
    style: {
      base: {
        fontSize: '16px',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        // lineHeight: '1.1875em',
      },
    },
  };
};

@withRouter
@connect(
  null,
  mapDispatchToProps,
)
@injectStripe
@withFormik({
  handleSubmit: (values, options) => {
    options.props.handleSubmit(values, options);
  },
  validationSchema: props => PaymentDetailsSchema,
})
@i18n('errors', 'booking')
export default class PaymentDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: false,
      cardExpiry: false,
      cardCvc: false,
    };
  };

  handleChange = change => {
    switch(change.elementType) {
    case 'cardNumber':
      this.setState({
        cardNumber: change.complete,
    })
      break;
    case 'cardExpiry':
      this.setState({
        cardExpiry: change.complete,
      })
      break;
    case 'cardCvc':
      this.setState({
        cardCvc: change.complete,
      })
    }
  };

  render() {
    const { inputFieldsForPaymentDetails } = bookingLabels;
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
      isSubmitting,
    } = this.props;
    return (
      <Form className="trip-details-form-wrapper">
        <div className="grid-header">
          <Grid
            className="grid-header-title"
            item
            xs={12}
            sm={12}
            container
            justify="space-between"
            alignItems="center">
            <Typography variant="title" fontSize="20px">
              {this.props.translate('addCard', 'booking')}
            </Typography>
            <Grid
              item
              xs={3}
              container
              className="cards-container"
              alignItems="center">
              <Grid
                item
                xs={6}
                container
                className="pic-cnt"
                alignItems="center">
                <img
                  className="avacard-logo"
                  src="/static/visa-card.png"
                  alt="visa logo"
                />
              </Grid>
              <Grid
                item
                xs={6}
                container
                className="pic-cnt"
                alignItems="center">
                <img
                  className="card-logo"
                  src="/static/mastercard-card.png"
                  alt="mastercard logo"
                />
              </Grid>
            </Grid>
          </Grid>
        </div>
        <div className="checkout">
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
          <div className="grid-field">
            <div className="field default-input required">
              <CardNumberElement
                onReady={el => console.log(el)}
                id="card-number"
                onChange={this.handleChange}
                {...createOptions()}
              />
              <label htmlFor="card-number">Card number</label>
              <div className="baseline" />
            </div>
          </div>
          <div className="grid-field half-width">
            <div className="field default-input required">
              <CardExpiryElement
                id="card-date"
                onChange={this.handleChange}
                {...createOptions()}
              />
              <label htmlFor="card-date">Expiration date</label>
              <div className="baseline" />
            </div>
          </div>
          <div className="grid-field  half-width">
            <div className="field default-input required">
              <CardCVCElement
                onChange={this.handleChange}
                id="card-cvc"
                placeholder="CVV"
                {...createOptions()}
              />
              <label htmlFor="card-cvc">CVV</label>
              <div className="baseline" />
            </div>
          </div>
        </div>
        <div className="buttons-cnt buttonStepTwo">
          <Button className="buttonsBookingDetails" onClick={handleBack}>
            {this.props.translate('back', 'booking')}
          </Button>
          <Button
            className="buttonsBookingDetails"
            type="submit"
            disabled={!this.props.errors.cardHolderName && dirty && this.state.cardExpiry && this.state.cardNumber && this.state.cardCvc ? false : true}>
            {this.props.translate('continue', 'booking')}
          </Button>
        </div>
      </Form>
    );
  }
}
