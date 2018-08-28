import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import MomentLocaleUtils from 'react-day-picker/moment';
import Cookies from 'js-cookie';
import moment from 'moment';
import { withRouter } from 'next/router';

import 'moment/locale/de';

import { Router } from '../../../../routes';
import loading from '../../../../services/decorators/loading';
import { availabilities } from '../../../../services/cruds';
import Right from './availabilityRight';

import './default.sass';
import './style.sass';

@loading(['modifiers'])
@withRouter
export default class Availability extends Component {
  state = {
    selectedDays: [],
  };

  componentWillMount() {
    this.loadAvailabilities();
  }

  componentDidUpdate(prevProps, prevState) {
    const currentLength = this.state.selectedDays.length;
    if (prevState.selectedDays.length !== currentLength && currentLength > 0) {
      this.loadTimeSlots();
    }
  }

  loadTimeSlots = () => {
    this.props.loadData(
      availabilities.get(
        {
          dates: this.state.selectedDays
            .map(day => moment(day).format('YYYY-MM-DD'))
            .join(','),
          profashionalId: this.props.router.query.id,
        },
        '/timeSlots',
      ),
      {
        saveTo: 'timeSlots',
        setData: true,
      },
    );
  };

  loadAvailabilities = () =>
    this.props.loadData(
      availabilities.get(
        {
          profashionalId: this.props.router.query.id,
        },
        '/dates',
      ),
      {
        saveTo: 'modifiers',
        mapper: data => ({
          events: data.dates.map(i => new Date(i)),
        }),
        setData: true,
      },
    );

  handleDayClick = (day, { selected, disabled }) => {
    if (selected) {
      const newArray = [...this.state.selectedDays];
      for (let i = 0; i < this.state.selectedDays.length; i++) {
        if (+this.state.selectedDays[i] === +day) {
          newArray.splice(i, 1);
          this.setState({ selectedDays: newArray });
          return;
        }
      }
    }
    if (!disabled)
      this.setState({ selectedDays: [...this.state.selectedDays, day] });
  };

  render() {
    return (
      <div className="calendar-wrapper">
        <DayPicker
          localeUtils={MomentLocaleUtils}
          locale={Cookies.get('lang') || 'en'}
          className="Selectable"
          selectedDays={this.state.selectedDays}
          modifiers={this.props.modifiers}
          onDayClick={this.handleDayClick}
          disabledDays={{ before: new Date() }}
        />
        <div className="second-calendar-block">
          <Right
            selectedDays={this.state.selectedDays}
            loadTimeSlots={this.loadTimeSlots}
            loadAvailabilities={this.loadAvailabilities}
          />
        </div>
      </div>
    );
  }
}
