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
			home: 'Home',
			profile: 'Profile',
			editProfile: 'Edit Profile',
			privateInfo: 'Private Info',
			settings: 'Settings',
			logOut: 'Log Out',
    },
		confirmModal: {
      confirm: 'Bestätigen',
      cancel: 'Abbrechen',
			editProfile:
				'Möchten Sie den Bereich Profil bearbeiten schließen? Ihre Informationen werden nicht gespeichert',
      ok: 'OK',
      yes: 'ja',
      no: 'nein',
    },
    errors: {
      matchPassword: 'passwords do not match1',
      email: 'Invalid email1',
      tooLong: 'Name cannot be longer than 50 symbols1',
      tooSmall: 'Name shall contain at least 2 symbols1',
      required: 'Required',
			passwordReq: 'passwordReq',
      onlyLetters: 'Only Letters',
			onlyNumbers: 'Only Numbers',
    },
    booking: {
      cancellationPolicyFullText:
        'If success is a process with a number of defined steps, then it is just like any other process. So, what is the first step in any process? If success is a process with a number of defined steps, then it is just like any other process. So, what is the first step in any process? If success is a process with a number of defined steps, then it is just like any other process. So, what is the first step in any process? If success is a process with a number of defined steps, then it is just like any other process. So, what is the first step in any process?',
      cancellationPolicyShortText:
        'If success is a process with a number of defined steps, then it is just like any other process. So, what is the first step in any process?… ',
      more: 'More',
      cancellationPolicyTitle: 'Cancellation policy:',
      who: 'Who is shopper?',
      where: 'Where, when, and what would you like to shop',
      learnmore: 'To learn more about our cancellation policy please click ',
      learnmoreclick: 'here',
      addCard: "Please add your Visa or Master Card"
    },
		common: {
			hour: 'hour',
			meetings: 'meetings',
			copyLink: 'Copy link',
			copied: 'Your link is copied',
			MEN: 'Men',
			WOMEN: 'Women',
			CHILD: 'Child',
			EVENT: 'Event',
			SPORTS: 'Sports',
			CASUAL: 'Casual',
			BUSINESS: 'Business',
			expertise: 'Expertise',
			languages: 'Languages',
			city: 'City',
			addSomePhoto: 'Add some additional photos of your work.',
		},
		reviews: {
			reviews: 'Reviews',
			noReviews: 'No reviews yet!',
		},
  }),
  // formats: object,
  // messages: object,
  // textComponent: any,
  locale: 'de',
};
