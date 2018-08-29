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
      editProfile: 'Edit Profile',
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
    popups: {
      startedTrip:
        'Success. Trip started and is tracking (calculating time) now until the end code will be entered',
    },
    confirmModal: {
      confirm: 'Confirm',
      editPrivateInfo:
        'Do you want to close Private Info section? your information will not be saved',
      editProfile:
        'Do you want to close Edit Profile section? your information will not be saved',
      booking:
        'Do you want to close booking request creation? Your info will not be saved',
      reallyDelete: 'Do you really want to delete this time slot?',
      wantLogOut: 'Are you sure you want to log out',
      cancel: 'Cancel',
      ok: 'OK',
      yes: 'yes',
      no: 'no',
    },
    modalHeaders: {
      enterCode: 'Please enter code.',
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
      addCard: 'Please add your Visa or Master Card',
      checkout: 'Please checkout details',
    },
    common: {
      hour: 'hour',
      certified: 'Certified',
      meetings: 'meetings',
      copiedLink: 'Your link is copied',
      copyLink: 'Copy link',
      createAvailability:
        'To create availability please select date on the calendar.',
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
      addTime: 'Add time',
    },
    reviews: {
      reviews: 'Reviews',
      noReviews: 'No reviews yet!',
    },
    listOfProfashionals: {
      title: 'how to use? ',
      location: 'find your profashional in zurich',
    },
    listOfProfashionalsTitle: {
      specialOcasion: 'Special ocasion',
      inspiration: 'Inspiration',
      exploreCity: 'Explore city',
    },
    listOfProfashionalsContent: {
      specialOcasion: 'Don’t raise your voice, improve your argument',
      inspiration:
        'If you want to achieve greatness stop asking for permission',
      exploreCity:
        'To live a creative life, we must lose our fear of being wrong',
    },
  }),
  // formats: object,
  // messages: object,
  // textComponent: any,
  locale: 'en',
};
