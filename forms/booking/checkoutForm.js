import React from 'react';
import { connect } from 'react-redux';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
  PostalCodeElement,
  Elements,
  injectStripe} from 'react-stripe-elements';
import InjectedCardForm from './cardForm';


export default class CheckoutForm extends React.Component {
  constructor() {
    super();
    this.state = {
    };
  }


  render() {
    return (
      <div className="Checkout">
        <Elements>
          <InjectedCardForm handleSubmit={this.props.handleSubmit}/>
        </Elements>
      </div>
    );
  }
}

