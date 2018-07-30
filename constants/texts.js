import DropDown from '../components/material-wrap/form/dropDown/index';
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
      infoIcon: true,
      placeholder: 'dd.mm.yyyy',
    },
    {
      label: 'Gender',
      name: 'gender',
      component: DropDown,
      options: [
        {
          name: 'men',
          id: 'MEN',
        },
        {
          name: 'female',
          id: 'Female',
        },
        {
          name: 'others',
          id: 'Others',
        },
      ],
    },
  ],
};
