import React, { Component } from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';

import { Router } from '../../../../routes';
import loading from '../../../../services/decorators/loading';

import './interview.sass';

@loading()
export default class Availability extends Component {
  render() {
    return (
      <div>
        <DayPicker />
      </div>
    );
  }
}
