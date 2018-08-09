import moment from 'moment';
import DropDown from '../components/material-wrap/form/dropDown/index';
import TextArea from '../components/material-wrap/form/textArea/index';
import DatePicker from '../components/material-wrap/form/datePicker/index';
import TimePicker from '../components/material-wrap/form/timePicker/index';

import { currencies, countries } from '../services/cruds';

const hours = [
  { id: 1, name: '00:00' },
  { id: 2, name: '10:00' },
  { id: 3, name: '11:00' },
];

export const bookingLabels = {
  inputFieldsForTripDetails1: [
    {
      label: 'Start time',
      name: 'startTime',
      component: TimePicker,
      additionalClass: 'required',
    },
    {
      label: 'End time (Estimated)',
      name: 'endTime',
      component: TimePicker,
      additionalClass: 'required',
    },
    {
      label: 'Preferred meeting location',
      name: 'meetingLocation',
      infoIcon: true,
        sm: 12,
    },
    {
      label: 'Notebox',
      name: 'notebox',
      component: TextArea,
      sm: 12,
      placeholder: "Please let us know what are you looking for and your possible budget."
      },
  ],
  inputFieldsForTripDetails2: [
    {
      label: 'First Name',
      name: 'firstName',
      additionalClass: 'required',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      additionalClass: 'required',
    },
    {
      label: 'Phone Number',
      name: 'phoneNumber',
      infoIcon: true,
      placeholder: '+41793002030',
      sm: 12,
      additionalClass: 'required',
    },
    {
      label: 'Birthday',
      name: 'birthday',
      component: DatePicker,
    },
    {
      label: 'Gender',
      name: 'gender',
      component: DropDown,
      options: [
        {
          name: 'Male',
          id: 'MALE',
        },
        {
          name: 'Female',
          id: 'FEMALE',
        },
        {
          name: 'Others',
          id: 'OTHERS',
        },
      ],
    },
  ],
  inputFieldsForPaymentDetails:[
    {
      label: 'Card Holder Name',
      name: 'cardHolderName',
      sm: 12,
      additionalClass: 'required',
    },
    {
      label: 'Card Number',
      name: 'cardNumber',
      sm: 12,
      additionalClass: 'required',
    },
    {
      label: 'Expiry Date',
      name: 'expiryDate',
      additionalClass: 'required',
    },
    {
      label: 'CVV',
      name: 'cvv',
      additionalClass: 'required',
    },
  ],
  inputFieldsForConfirm: [
    {
      label: 'Preferred Meeting Location',
      name: 'confirmMeetingLocation',
      sm: 12,
      setFieldValue: 'Auqapark',
    },
    {
      label: 'Estimated Starting Time',
      name: 'EstimatedStartTime',
      fieldValue: '9:00',
    },
    {
      label: 'Estimated End Time',
      name: 'EstimatedEndTime',
      fieldValue: '11:00',
    },
    {
      label: 'Estimated Price',
      name: 'estimatedPrice',
      sm: 12,
      additionalClass: "bold",
      infoIcon: true,
    },
    {
      name: 'confirmNotebox',
      component: TextArea,
      sm: 12,
      placeholder: "I am from NYC and love Shopping in European cities like Zurich. Looking for a local to show me fashion hot-spots. "
    },
  ],
};
