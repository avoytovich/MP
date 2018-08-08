import moment from 'moment';
import DropDown from '../components/material-wrap/form/dropDown/index';
import TextArea from '../components/material-wrap/form/textArea/index';
import DatePicker from '../components/material-wrap/form/datePicker/index';
import { currencies, countries } from '../services/cruds';

const hours = [
  { id: 1, name: '9:00' },
  { id: 2, name: '10:00' },
  { id: 3, name: '11:00' },
];

export const bookingLabels = {
  inputFieldsForTripDetails1: [
    {
      label: 'Start time',
      name: 'startTime',
      component: DropDown,
      options: hours,
    },
    {
      label: 'End time (Estimated)',
      name: 'endTime',
      component: DropDown,
      options: hours,
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
    },
    {
      label: 'Last Name',
      name: 'lastName',
    },
    {
      label: 'Phone Number',
      name: 'phoneNumber',
      infoIcon: true,
      placeholder: '+41793002030',
      sm: 12,
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
    },
    {
      label: 'Card Number',
      name: 'cardNumber',
      sm: 12,
    },
    {
      label: 'Expiry Date',
      name: 'expiryDate',
    },
    {
      label: 'CVV',
      name: 'cvv',
    },
  ],
};
