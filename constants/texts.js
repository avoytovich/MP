import moment from 'moment';
import DropDown from '../components/material-wrap/form/dropDown/index';
import DatePicker from '../components/material-wrap/form/datePicker/index';
import { currencies, countries } from '../services/cruds';

export const privateInfo = {
  inputFieldsForStepOne: [
    {
      label: 'First Name',
      name: 'firstName',
    },
    {
      label: 'Last Name',
      name: 'lastName',
    },
    {
      label: 'Email',
      name: 'email',
    },
    {
      label: 'Phone Number',
      name: 'phoneNumber',
      infoIcon: true,
      placeholder: '+41793002030',
    },
    {
      label: 'Address',
      name: 'address',
    },
    {
      label: 'Zip',
      name: 'zip',
    },
    {
      label: 'City',
      name: 'city',
    },
    {
      label: 'Country',
      name: 'country',
      component: DropDown,
      getFrom: () => countries.get(),
    },
    {
      label: 'Bank account number',
      name: 'bankAccountNumber',
      placeholder: 'CH89370400440532013000',
    },
    {
      label: 'Currency',
      name: 'currency',
      component: DropDown,
      getFrom: () => currencies.get(),
    },
  ],
  inputFieldsForStepTwo: [
    {
      label: 'Birthday',
      name: 'birthday',
      component: DatePicker,
      infoIcon: true,
      placeholder: 'dd.mm.yyyy',
      maxDate: moment()
        .subtract(18, 'years')
        .format('YYYY-MM-DD'),
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
};

export const listOfProfashionals = {
  images: [
    {
      title: 'Special ocasion',
      alt: 'special ocasion',
      src: '../static/png/special_ocasion.png',
      content: 'Don’t raise your voice, improve your argument',
    },
    {
      title: 'Inspiration',
      alt: 'inspiration',
      src: '../static/png/inspiration.png',
      content: 'If you want to achieve greatness stop asking for permission',
    },
    {
      title: 'Explore city',
      alt: 'explore_city',
      src: '../static/png/explore_city.png',
      content: 'To live a creative life, we must lose our fear of being wrong',
    },
  ],
};
