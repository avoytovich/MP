import React, { Component } from 'react';
import moment from 'moment';
import { get } from 'lodash';
import Close from '@material-ui/icons/Close';

import { withRouter } from 'next/router';

import { Router } from '../../../../routes';
import loading from '../../../../services/decorators/loading';
import FromTo from '../../../../forms/fromTo';
import { availabilities } from '../../../../services/cruds';

import './default.sass';
import './style.sass';
import CustomTypography from '../../../../components/material-wrap/typography/index';
import Button from '../../../../components/material-wrap/button';
import i18n from '../../../../services/decorators/i18n';
import withConfirmModal from '../../../../services/decorators/withConfirmModal/index';

@loading(['modifiers', 'timeSlots'])
@withRouter
@withConfirmModal('reallyDelete', 'no', 'yes')
@i18n('common')
export default class AvailabilityRight extends Component {
  state = {
    count: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.selectedDays.length !== this.props.selectedDays.length) {
      this.resetState();
      return;
    }
  }

  resetState = () => this.setState({ count: 0 });

  addCount = () => this.setState({ count: this.state.count + 1 });

  deleteTimeSlot = async (date, { startTime, endTime }) => {
    await this.props.loadData(
      availabilities.deleteRequest({
        date,
        startTime,
        endTime,
        profashionalId: this.props.router.query.id,
      }),
    );
    this.props.loadAvailabilities();
    this.props.loadTimeSlots();
  };

  getTimeSlots = values => {
    const timeSlots = [];
    for (let i = 0; i < this.state.count; i++) {
      timeSlots.push({
        startTime:
          moment(get(values, `from${i}`)).format('HH') * 60 +
          Number(moment(get(values, `from${i}`)).format('mm')),
        endTime:
          moment(get(values, `to${i}`)).format('HH') * 60 +
          Number(moment(get(values, `to${i}`)).format('mm')),
      });
    }
    return timeSlots;
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
    await this.props.loadData(
      availabilities.post({
        datesTimeSlots: this.props.selectedDays.map(day => ({
          date: moment(day).format('YYYY-MM-DD'),
          timeSlots: this.getTimeSlots(values),
        })),
        profashionalId: this.props.router.query.id,
      }),
      {
        showError: true,
      },
    );
    props.resetForm();
    this.setState({ count: 0 });
    this.props.loadData(this.props.loadAvailabilities());
    this.props.loadData(this.props.loadTimeSlots());
  };

  get renderTimeSlots() {
    const timeSlots = this.props.timeSlots;
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
              {slot.timeSlots.map((timeSlot, i) => {
                const arrDate = slot.date.split('-');
                arrDate[1] = Number(arrDate[1]) - 1;
                return (
                  <div className="time-slot-item" key={i}>
                    <CustomTypography variant="subheading" fontSize="16px">
                      {`${moment(
                        arrDate.concat([
                          Math.floor(timeSlot.startTime / 60),
                          timeSlot.startTime % 60,
                        ]),
                      ).format('HH:mm')} -
                ${moment(
                  arrDate.concat([
                    Math.floor(timeSlot.endTime / 60),
                    timeSlot.endTime % 60,
                  ]),
                ).format('HH:mm')}`}
                    </CustomTypography>
                    <Close
                      className="pointer"
                      onClick={() =>
                        this.props.openConfirm(() =>
                          this.deleteTimeSlot(slot.date, timeSlot),
                        )
                      }
                    />
                  </div>
                );
              })}
            </div>
          ),
      );
    }
    return null;
  }

  get addTimeButton() {
    return (
      <Button className="add-time-btn" onClick={this.addCount}>
        {this.props.translate('addTime')}
      </Button>
    );
  }

  get renderSelectedDays() {
    return (
      <CustomTypography fontSize="16px" variant="title">
        {this.props.selectedDays
          .map(sd => moment(sd).format('DD.MM.YYYY'))
          .join(' / ')}
      </CustomTypography>
    );
  }

  render() {
    if (this.props.selectedDays.length === 0)
      return (
        <div className="no-content">
          <CustomTypography fontSize="20px" variant="subheading">
            {this.props.translate('createAvailability')}
          </CustomTypography>
        </div>
      );
    return (
      <div className="time-slots-wrapper">
        {this.renderTimeSlots}
        <div className="selected-days">{this.renderSelectedDays}</div>
        {this.props.selectedDays.length > 0 && (
          <FromTo
            handleSubmit={this.sendAvaibilities}
            className="selected-days"
            count={this.state.count}
            onCancel={this.resetState}
            selectedDays={this.props.selectedDays}
            button={this.addTimeButton}
          />
        )}
        {this.props.selectedDays.length === 1 && this.addTimeButton}
      </div>
    );
  }
}
