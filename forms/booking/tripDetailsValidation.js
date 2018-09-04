
export const tripDetailsValidation = (values, props) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = 'required';
  } else if (!/[a-zA-Z]/i.test(values.firstName)) {
    errors.firstName = 'onlyLetters';
  } else if (values.firstName.length < 2) {
    errors.firstName = 'tooSmall';
  }
  if (!values.lastName) {
    errors.lastName = 'required';
  } else if (!/[a-zA-Z]/.test(values.lastName)) {
    errors.lastName = 'onlyLetters';
  } else if (values.lastName.length < 2) {
    errors.firstName = 'tooSmall';
  }
  if (!values.phoneNumber) {
    errors.phoneNumber = 'required';
  } else if (!/^[+][0-9]*$/.test(values.phoneNumber)) {
    errors.phoneNumber = 'phoneFormat';
  } else if (values.phoneNumber.length < 13) {
    errors.phoneNumber = 'tooSmallPhone';
  } else if (values.phoneNumber.length > 13) {
    errors.phoneNumber = 'tooLongPhone';
  }
  if (!values.startTime) {
    errors.startTime = 'required';
  } else if (
    !values.startTime.isAfter(props.bookingProfile.startTime) ||
    !values.startTime.isBefore(props.bookingProfile.endTime)
  ) {
    errors.startTime = 'startShouldFit';
  } else if (!values.endTime) {
    errors.endTime = 'required';
  } else if (
    !values.endTime.isAfter(props.bookingProfile.startTime) ||
    !values.startTime.isBefore(props.bookingProfile.endTime)
  ) {
    errors.endTime = 'endShouldFit';
  } else if (values.startTime && values.endTime.isBefore(values.startTime)) {
    errors.endTime = 'endShouldBeBefore';
  }
  return errors;
}