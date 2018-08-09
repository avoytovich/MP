import React from 'react';
import Grid from '@material-ui/core/Grid';

import ModalHeader from '../../../components/modalHeader';
import Stepper from '../../../components/stepper/index';
import Typography from '../../../components/material-wrap/typography';
import TripDetails from '../../../forms/booking/bookingTripDetails';
import PaymentDetails from '../../../forms/booking/bookingPaymentDetails';
import Confirm from '../../../forms/booking/bookingConfirm';
import PrivateInfoStepTwo from '../../../forms/privateInfo/privateInfoStepTwo';

import './booking.sass';
import ProfashionalInfo from '../../../components/profashionalInfo';
import { find } from 'lodash';

export default class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      forwardToSecondStep: false,
      forwardToThirdStep: false,
      steps: ['Trip details', 'Payment Details', 'Confirm'],
    };
  }

  handleBackForStepTwo = values => {
    this.child.current.handleBack();
    this.setState({
      forwardToSecondStep: false,
    });
  };

  handleBackForStepThree = values => {
    this.child.current.handleBack();
    this.setState({
      forwardToThirdStep: false,
    });
  };

  handleSubmitForStepOne = values => {
    console.log("go handleSubmitForStepOne")
    this.child.current.handleNext();
    console.log("handleSubmitForStepOne", this.state)
    this.setState({
      forwardToSecondStep: true,
    });
  };

  handleSubmitForStepTwo = values => {
    console.log("go handleSubmitForStepTwo")
    this.child.current.handleNext();
    console.log("handleSubmitForStepTwo", this.state)
    this.setState({
      forwardToThirdStep: true,
    });
  };

  render() {
    console.log('props', this.props);
    console.log('forward', this.state.forwardToSecondStep);

    let step;

    if (this.state.forwardToThirdStep){
      step=<Confirm
        handleBack={this.handleBackForStepThree}
        // handleSubmit={this.handleSubmitForStepThree}
      />
    }
    else if (this.state.forwardToSecondStep){
      step=<PaymentDetails
        // handleSubmit={this.handleSubmitForStepTwo}
        handleContinue={this.handleSubmitForStepTwo}
        handleBack={this.handleBackForStepTwo}
      />
    }
    else{
      step=<TripDetails
        {...this.initialValues}
        privateInfo={this.props.privateInfo}
        // handleSubmit={this.handleSubmitForStepOne}
        handleContinue={this.handleSubmitForStepOne}
      />
    };

    return (
      <div className="booking-step">
        <Grid container spacing={0} justify="center">
          <Grid item xs={12} sm={12}>
            <ModalHeader
              title="Booking"
              className="test"
              onClose={() => this.props.openConfirm()}
            />
            <div className="grid-stepper">
              <Grid className="grid" item xs={12} sm={6}>
                <Stepper steps={this.state.steps} ref={this.child}/>
              </Grid>
            </div>
            <div className="profashional-info-section">
              <Grid className="grid" item xs={12} sm={6}>
                <ProfashionalInfo />
              </Grid>
            </div>
            <div className="grid-field">
              <Grid className="grid-field-input" item xs={12} sm={6}>
                {step}
              </Grid>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}
