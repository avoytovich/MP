import React from 'react';
import Grid from '@material-ui/core/Grid';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'next/router';

import ModalHeader from '../../../components/modalHeader';
import Stepper from '../../../components/stepper/index';
import Typography from '../../../components/material-wrap/typography';
import TripDetails from '../../../forms/booking/bookingTripDetails';
import PaymentDetails from '../../../forms/booking/bookingPaymentDetails';
import Confirm from '../../../forms/booking/bookingConfirm';
import CheckoutForm from '../../../forms/booking/checkoutForm';
import PrivateInfoStepTwo from '../../../forms/privateInfo/privateInfoStepTwo';

import './booking.sass';
import ProfashionalInfo from '../../../components/profashionalInfo';
import { find, get } from 'lodash';
import { resetData, updateSpecData } from '../../../actions/updateData';
import { Elements } from 'react-stripe-elements';
import loading from '../../../services/decorators/loading';
import { Router } from '../../../routes';
import { bookings, profashionals } from '../../../services/cruds';
import moment from 'moment';
import withModal from '../../../services/decorators/withModal';
import withConfirmModal from "../../../services/decorators/withConfirmModal";

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updateSpecData, resetData }, dispatch);

const mapStateToProps = ({ runtime }) => ({
  bookingInfo: runtime.bookingInfoData,
  customerAccount: runtime.customerAccountData,
  customerBookingInfo: runtime.customerBookingInfoData,
});
@withRouter
@withModal(
  'Thank you for booking! Profashional shall reply on your request within 24 hours! Check your email inbox.',
  props => Router.pushRoute('/list-of-profashionals'),
)
@withConfirmModal('booking', 'no', 'yes', props =>
  Router.pushRoute('/list-of-profashionals')
)
@connect(
  mapStateToProps,
  mapDispatchToProps,
)
@loading(['bookingProfile'])
export default class Booking extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      loaded: false,
      forwardToSecondStep: false,
      forwardToThirdStep: false,
      steps: ['Trip details', 'Payment Details', 'Confirm'],
      profashionalId: '',
      startTime: '00:00',
      endTime: '24:00',
      comission: '10',
      rate: '20',
      date: '29-08-2018',
      profFirstName: 'Aaron',
      profLastName: 'Lichsteiner',
      rating: 0,
      profAvatar: '/static/profashional-picture.jpg',
    };
  }

  componentWillMount = async () => {
    const {
      profashionalId,
      date,
      startTime,
      endTime,
    } = this.props.router.query;
    await this.props.loadData(profashionals.getWithId(profashionalId, ''), {
      saveTo: 'bookingProfile',
      mapper: data => ({
        profashionalId: profashionalId,
        date: this.reformatDate(date),
        startTime: this.reformatTime(startTime),
        endTime: this.reformatTime(endTime),
        profFirstName: data.firstName,
        rate: data.currentRate / 100,
        rating: data.rating,
        profAvatar: data.icon.path,
      }),
    });
  };

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
    this.props.updateSpecData(values, 'bookingInfo');
    this.props.updateSpecData(
      {
        estimatedPrice: `${this.getPrice(
          values.startTime,
          values.endTime,
        )} CHF`,
      },
      'bookingInfo',
    );
    this.child.current.handleNext();
    this.setState({
      forwardToSecondStep: true,
    });
    this.renderStartTime(values.startTime);
    this.renderEndTime(values.endTime);
  };

  handleSubmitForStepTwo = async (values, options) => {
    if (options.props.stripe) {
      try {
        const res = await options.props.stripe.createToken();
        this.props.updateSpecData({ cardToken: res.token.id }, 'bookingInfo');
        this.props.updateSpecData(values, 'bookingInfo');
        this.child.current.handleNext();
        this.setState({
          forwardToThirdStep: true,
        });
      } catch (error) {
        console.error('error', error);
      }
    } else {
      console.log("Stripe.js hasn't loaded yet.");
    }
  };

  handleSubmitForStepThree = async values => {
    const { bookingInfo } = this.props;
    const data = {
      date: this.reformatDate(this.state.date),
      description: bookingInfo.notebox,
      endTime: this.state.endTime.replace(':', ''),
      location: bookingInfo.meetingLocation,
      privateInfo: {
        cardHolderName: bookingInfo.cardHolderName,
        cardToken: bookingInfo.cardToken,
        dob: bookingInfo.birthday.format('YYYY-MM-DD'),
        firstName: bookingInfo.firstName,
        gender: bookingInfo.gender,
        lastName: bookingInfo.lastName,
        phoneNumber: bookingInfo.phoneNumber,
      },
      profashionalId: this.state.profashionalId,
      shopperId: 11,
      startTime: this.state.startTime.replace(':', ''),
      type: 'PRE_BOOKING',
    };
    const resp = await this.props.loadData(
      bookings.post(data, '/request',
      ),
    );
    this.props.openModal();
  };

  renderStartTime(time) {
    const newStartTime = time.format('H:mm');
    this.setState({
      startTime: newStartTime,
    });
  }

  renderEndTime(time) {
    const newEndTime = time.format('H:mm');
    this.setState({
      endTime: newEndTime,
    });
  }

  reformatDate(date) {
    const res = date.split('-');
    const newres = `${res[2]}-${res[1]}-${res[0]}`;
    return newres;
  }

  reformatTime(time) {
    if (time.length === 4) {
      const res = time.split('');
      const newres = `${res[0]}${res[1]}:${res[2]}${res[3]}`;
      return newres;
    } else {
      const res = time.split('');
      const newres = `${res[0]}:${res[1]}${res[2]}`;
      return newres;
    }
  }

  getPrice(start, end) {
    const time = (end.unix() - start.unix()) / 60;
    const price =
      (((time * Number(this.state.rate)) / 60) *
        100 *
        (100 + Number(this.state.comission))) /
      10000;
    return price.toFixed(2);
  }

  get initialValues() {
    const customerBookingInfo = get(this.props, 'customerBookingInfo') || {};
    const bookingInfo = get(this.props, 'bookingInfo');
    if (bookingInfo) return get(this.props, 'bookingInfo');
    return {
      ...get(this.props, 'customerBookingInfo'),
      ...get(this.props, 'customerAccount'),
      startTime: customerBookingInfo.startTime || undefined,
      endTime: customerBookingInfo.endTime || undefined,
      meetingLocation: customerBookingInfo.meetingLocation || '',
      notebox: customerBookingInfo.notebox || '',
      firstName: customerBookingInfo.firstName || '',
      lastName: customerBookingInfo.lastName || '',
      phoneNumber: customerBookingInfo.phoneNumber || '',
      birthday: customerBookingInfo.birthday || '',
      gender: customerBookingInfo.gender || '',
      cardHolderName: customerBookingInfo.cardHolderName || '',
    };
  }

  render() {
    const { customerBookingInfo } = this.props;
    let step;

    if (this.state.forwardToThirdStep) {
      step = (
        <Confirm
          {...this.initialValues}
          handleBack={this.handleBackForStepThree}
          handleSubmit={this.handleSubmitForStepThree}
        />
      );
    } else if (this.state.forwardToSecondStep) {
      step = (
        <Elements>
          <PaymentDetails
            {...this.initialValues}
            handleSubmit={this.handleSubmitForStepTwo}
            handleBack={this.handleBackForStepTwo}
          />
        </Elements>
      );
      // step=<CheckoutForm/>
    } else {
      step = (
        <TripDetails
          {...this.initialValues}
          bookingInfo={this.props.bookingInfo}
          handleSubmit={this.handleSubmitForStepOne}
        />
      );
    }
    if (!this.props.bookingProfile) {
      return null;
    } else {
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
                  <Stepper steps={this.state.steps} ref={this.child} />
                </Grid>
              </div>
              <div className="profashional-info-section">
                <Grid className="grid" item xs={12} sm={6}>
                  <ProfashionalInfo {...this.props.bookingProfile} />
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
}
