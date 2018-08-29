import React, { Component } from 'react';
import moment from 'moment';
import qs from 'qs';
import { get } from 'lodash';

import { withRouter } from 'next/router';

import { Router } from '../../../../routes';
import loading from '../../../../services/decorators/loading';

import './default.sass';
import './style.sass';
import CustomTypography from '../../../../components/material-wrap/typography/index';
import i18n from '../../../../services/decorators/i18n';
import { availabilities } from '../../../../services/cruds';
import withConfirmModal from '../../../../services/decorators/withConfirmModal/index';
import BookProfashionalForm from '../../../../forms/bookProfashionalForm/index';

@loading(['modifiers', 'timeSlots'])
@withRouter
@withConfirmModal('reallyDelete', 'no', 'yes')
@i18n('common')
export default class AvailabilityRight extends Component {
  state = {
    count: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedDays[0] !== this.props.selectedDays[0]) {
      this.resetState();
      return;
    }
  }

  resetState = () => this.setState({ count: 0 });

  submitBook = values => {
    Router.pushRoute(
      `/booking?${qs.stringify({
        ...values.slot.timeSlots[values.time],
        profashionalId: this.props.router.query.id,
        date: values.slot.date,
      })}`,
    );
  };

  validateAvaibilities = (values, { setErrors }) => {
    let result = true;
    const errors = {};
    for (let i = 0; i < this.state.count; i++) {
      const startTime =
        moment(get(values, `from${i}`)).format('HH') * 60 +
        Number(moment(get(values, `from${i}`)).format('mm'));
      const endTime =
        moment(get(values, `to${i}`)).format('HH') * 60 +
        Number(moment(get(values, `to${i}`)).format('mm'));
      if (!get(values, `from${i}`)) {
        errors[`from${i}`] = 'Required';
        result = false;
      }
      if (!get(values, `to${i}`)) {
        errors[`to${i}`] = 'Required';
        result = false;
      }
      if (startTime > endTime) {
        // error from
        result = false;
        errors[`from${i}`] = 'Must be less';
      }
      if (endTime < startTime) {
        // error to
        result = false;
        errors[`to${i}`] = 'Must be more';
      }
    }
    if (!result) setErrors(errors);
    return result;
  };

  sendAvaibilities = async (values, props) => {
    if (!this.validateAvaibilities(values, props)) return;
    const body = {
      date: moment(this.props.selectedDays[0]).format('YYYY-MM-DD'),
      startTime: values.from0.hours() * 60 + values.from0.minutes(),
      endTime: values.to0.hours() * 60 + values.to0.minutes(),
      profashionalId: this.props.router.query.id,
    };
    await this.props.loadData(
      availabilities.get(body, '/time-slots/is-available'),
      {
        showError: true,
      },
    );
    props.resetForm();
    Router.pushRoute(
      `/booking?${qs.stringify(body)}`,
    );
  };

  get renderTimeSlots() {
    const timeSlots = this.props.timeSlots;
    if (timeSlots && timeSlots.length > 0) {
      return (
        <div className="day-wrapper">
          <CustomTypography
            className="date-header"
            variant="title"
            fontSize="16px">
            {moment(timeSlots[0].date).format('DD.MM.YYYY')}
          </CustomTypography>
          <BookProfashionalForm
            slot={timeSlots[0]}
            fromToSubmit={this.sendAvaibilities}
            selectedDay={this.props.selectedDays[0]}
            handleSubmit={this.submitBook}
          />
        </div>
      );
    }
    if (timeSlots) {
      return timeSlots.map(
        (slot, index) =>
          slot.timeSlots.length > 0 && (
            <div key={index} className="day-wrapper">
              <CustomTypography
                className="date-header"
                variant="title"
                fontSize="16px">
                {moment(slot.date).format('DD.MM.YYYY')}
              </CustomTypography>
              <BookProfashionalForm
                slot={slot}
                fromToSubmit={this.sendAvaibilities}
                selectedDay={this.props.selectedDays[0]}
                handleSubmit={this.submitBook}
              />
            </div>
          ),
      );
    }
    return null;
  }

  render() {
    if (this.props.selectedDays.length === 0)
      return (
        <div className="no-content">
          <CustomTypography fontSize="20px" variant="subheading">
            {this.props.translate('bookAvailability')}
          </CustomTypography>
        </div>
      );
    return <div className="time-slots-wrapper">{this.renderTimeSlots}</div>;
  }
}
