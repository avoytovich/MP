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
    },
  }),
  // formats: object,
  // messages: object,
  // textComponent: any,
  locale: 'en',
};
