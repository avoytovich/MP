import objKeys2Strings from '../services/objKeys2Strings';

export default {
  messages: objKeys2Strings({
    objectTest: {
      testString: 'English text',
    },
    menu: {
      becomeProfashional: 'Become a profashional',
      logIn: 'Log in',
      signUp: 'Sign Up',
      home: 'Home',
      profile: 'Profile',
      privateInfo: 'Private Info',
      settings: 'Settings',
      logOut: 'Log Out',
    },
    errors: {
      matchPassword: 'passwords do not match',
      email: 'Invalid email',
      tooLong: 'Text is too long',
      tooSmall: 'Name shall contain at least 2 symbols',
      required: 'Required',
      passwordReq: 'passwordReq',
      onlyLetters: 'Only Letters',
      onlyNumbers: 'Only Numbers',
    },
    confirmModal: {
      confirm: 'Confirm',
      editPrivateInfo:
        'Do you want to close Private Info section? your information will not be saved',
      editProfile:
        'Do you want to close Edit Profile section? your information will not be saved',
      cancel: 'Cancel',
      ok: 'OK',
      yes: 'yes',
      no: 'no',
    },
    common: {
      hour: 'hour',
      meetings: 'meetings',
      copyLink: 'Copy link',
      copied: 'Copy link',
      MEN: 'Men',
      WOMEN: 'Women',
      CHILD: 'Child',
      EVENT: 'Event',
      SPORTS: 'Sports',
      CASUAL: 'Casual',
      BUSINESS: 'Business',
    },
  }),
  // formats: object,
  // messages: object,
  // textComponent: any,
  locale: 'en',
};
