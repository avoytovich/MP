/* eslint-disable prettier/prettier */
import objKeys2Strings from '../services/objKeys2Strings';

export default {
  messages: objKeys2Strings({
    objectTest: {
      testString: 'German text',
    },
    menu: {
      becomeProfashional: 'Become a profashional',
      logIn: 'Log in',
      signUp: 'Sign Up',
    },
		confirmModal: {
      confirm: 'Bestätigen',
      cancel: 'Abbrechen',
			editProfile:
				'Möchten Sie den Bereich Profil bearbeiten schließen? Ihre Informationen werden nicht gespeichert',
      ok: 'OK',
    },
    errors: {
      matchPassword: 'passwords do not match1',
      email: 'Invalid email1',
      tooLong: 'Name cannot be longer than 50 symbols1',
      tooSmall: 'Name shall contain at least 2 symbols1',
      required: 'Required',
			passwordReq: 'passwordReq',
      onlyLetters: 'Only Letters',
    },
  }),
  // formats: object,
  // messages: object,
  // textComponent: any,
  locale: 'de',
};
