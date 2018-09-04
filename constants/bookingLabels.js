import moment from 'moment';
import DropDown from '../components/material-wrap/form/dropDown/index';
import TextArea from '../components/material-wrap/form/textArea/index';
import DatePicker from '../components/material-wrap/form/datePicker/index';
import TimePicker from '../components/material-wrap/form/timePicker/index';


export const bookingLabels = {
  inputFieldsForTripDetails1: [
    {
      label: 'Start time',
      name: 'startTime',
      component: TimePicker,
      additionalClass: 'required input-custom',
    },
    {
      label: 'End time (Estimated)',
      name: 'endTime',
      component: TimePicker,
      additionalClass: 'required input-custom',
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
      placeholder: "Please let us know what are you looking for and your possible budget.",
      additionalClass: 'input-custom',
      },
  ],
  inputFieldsForTripDetails2: [
    {
      label: 'First Name',
      name: 'firstName',
      placeholder: 'First Name',
      additionalClass: 'required',
    },
    {
      label: 'Last Name',
      name: 'lastName',
      placeholder: 'Last Name',
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
      maxDate: moment()
        .subtract(18, 'years')
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
  ],
  inputFieldsForConfirm: [
    {
      label: 'Estimated Price',
      name: 'estimatedPrice',
      additionalClass: "bold disabled",
      infoIcon: true,
      disabled: true,
    },
    {
      label: 'Preferred Meeting Location',
      name: 'meetingLocation',
      additionalClass: "disabled",
      disabled: true,
    },
    {
      component: TextArea,
      name: 'notebox',
      sm: 12,
      additionalClass: "disabled",
      disabled: true,
    },
  ],
};
