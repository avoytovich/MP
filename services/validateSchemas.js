import * as Yup from 'yup';
import { mapValues } from 'lodash';

const email = 'email',
  required = 'required',
  toSmall = 'tooSmall',
  toLong = 'tooLong',
  matchPassword = 'matchPassword',
  passwordReq = 'passwordReq',
  phoneNumberReq = 'phoneNumberReq',
  phoneFormat = 'phoneFormat',
  tooSmallPhone = 'tooSmallPhone',
  zipReq = 'zipReq',
  bankAccountNumberReq = 'bankAccountNumberReq',
  onlyNumbers = 'onlyNumbers',
  onlyLetters = 'onlyLetters',
  cardHolderReq = 'cardHolderReq';

function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg,
    params: {
      reference: ref.path,
    },
    test: function(value) {
      return value === this.resolve(ref);
    },
  });
}
Yup.addMethod(Yup.string, 'equalTo', equalTo);
Yup.addMethod(Yup.date, 'moreThan', (ref, msg) => {
  return Yup.mixed().test({
    name: 'moreThan',
    exclusive: false,
    message: msg,
    params: {
      reference: ref.path,
    },
    test: function(value) {
      return value > this.resolve(ref);
    },
  });
});
Yup.addMethod(Yup.date, 'lessThan', (ref, msg) => {
  return Yup.mixed().test({
    name: 'moreThan',
    exclusive: false,
    message: msg,
    params: {
      reference: ref.path,
    },
    test: function(value) {
      return value < this.resolve(ref);
    },
  });
});

const SignUpSchema = Yup.object().shape({
  email: Yup.string()
    .email(email)
    .required(required),
  firstName: Yup.string()
    .min(2, toSmall)
    .max(50, toLong)
    .matches(/[a-zA-Z]/, onlyLetters)
    .required(required),
  lastName: Yup.string()
    .min(2, toSmall)
    .max(50, toLong)
    .matches(/[a-zA-Z]/, onlyLetters)
    .required(required),
  password: Yup.string()
    .min(8, toSmall)
    .max(50, toLong)
    .matches(/(?:[A-Z].*[0-9])|(?:[0-9].*[A-Z])/, passwordReq)
    .required(required),
  confirmPassword: Yup.string()
    .equalTo(Yup.ref('password'), matchPassword)
    .required(required),
  confirm: Yup.boolean().oneOf([true], 'needConfirm'),
});

const checkAvailability = Yup.object().shape({
  time: Yup.number().required(required),
});

const SocialSignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, toSmall)
    .max(50, toLong)
    .matches(/[a-zA-Z]/, onlyLetters)
    .required(required),
  lastName: Yup.string()
    .min(2, toSmall)
    .max(50, toLong)
    .matches(/[a-zA-Z]/, onlyLetters)
    .required(required),
  confirm: Yup.boolean().oneOf([true], 'needConfirm'),
});

const RateSchema = Yup.object().shape({
  rate: Yup.number().required(required),
  myProfashionalRecomending: Yup.number().required(required),
  comment: Yup.string()
    .min(2, toSmall)
    .max(150, toLong)
    .required(required),
  wasSuccess: Yup.string().required(required),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email(email)
    .required(required),
  password: Yup.string().required(required),
});

const ForgotSchema = Yup.object().shape({
  email: Yup.string()
    .email(email)
    .required(required),
});

const InterviewSchema = Yup.object().shape({
  description: Yup.string()
    .required(required)
    .max(120, toLong),
});

const TripSchema = Yup.object().shape({
  code: Yup.string()
    .required(required)
    .max(12, toLong),
});

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, toSmall)
    .max(50, toLong)
    .matches(/(?:[A-Z].*[0-9])|(?:[0-9].*[A-Z])/, passwordReq)
    .required(required),
  confirmPassword: Yup.string()
    .equalTo(Yup.ref('password'), matchPassword)
    .required(required),
});

const PrivateInfoSchemaStepOne = Yup.object().shape({
  firstName: Yup.string()
    .min(2, toSmall)
    .max(50, toLong)
    .matches(/[a-zA-Z]/, onlyLetters)
    .required(required),
  lastName: Yup.string()
    .min(2, toSmall)
    .max(50, toLong)
    .matches(/[a-zA-Z]/, onlyLetters)
    .required(required),
  email: Yup.string()
    .email(email)
    .required(required),
  phoneNumber: Yup.string()
    .min(13, toSmall)
    .max(13, toLong)
    .matches(/^[+][0-9]*$/, phoneNumberReq)
    .required(required),
  address: Yup.string()
    .min(2, toSmall)
    .max(30, toLong)
    .required(required),
  zip: Yup.string()
    .min(4, toSmall)
    .max(4, toLong)
    .matches(/^[0-9]*$/, zipReq)
    .required(required),
  city: Yup.string()
    .min(2, toSmall)
    .max(30, toLong)
    .required(required),
  bankAccountNumber: Yup.string()
    .min(22, toSmall)
    .max(22, toLong)
    .matches(/^[C][H][0-9]*$/, bankAccountNumberReq)
    .required(required),
  confirm: Yup.boolean().oneOf([true], 'needConfirm'),
});

const PrivateInfoSchemaStepTwo = Yup.object().shape({
  birthday: Yup.string().required(required),
  gender: Yup.string().required(required),
  confirm: Yup.boolean().oneOf([true], 'needConfirm'),
});

const EditProfileSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(30, toLong)
    .required(required),
  slogan: Yup.string()
    .max(50, toLong)
    .required(required),
  aboutMe: Yup.string()
    .max(350, toLong)
    .required(required),
  expertises: Yup.array()
    .of(Yup.string())
    .required(required),
  occasion: Yup.array()
    .of(Yup.string())
    .required(required),
  languages: Yup.array()
    .of(Yup.string())
    .required(required),
  currency: Yup.number().required(required),
  hourlyRate: Yup.string()
    .max(5, toLong)
    .matches(/^(0|([1-9][0-9]*))(.[0-9]+)?$/, onlyNumbers)
    .required(required),
});

const TripDetailsSchema = Yup.object().shape({
  endTime: Yup.string().required(required),
  startTime: Yup.string().required(required),
  firstName: Yup.string()
    .min(2, toSmall)
    .max(50, toLong)
    .matches(/[a-zA-Z]/, onlyLetters)
    .required(required),
  lastName: Yup.string()
    .min(2, toSmall)
    .max(50, toLong)
    .matches(/[a-zA-Z]/, onlyLetters)
    .required(required),
  phoneNumber: Yup.string()
    .matches(/^[+][0-9]*$/, phoneFormat)
    .min(13, tooSmallPhone)
    .max(13, toLong)
    .required(required),
  meetingLocation: Yup.string().max(50, toLong),
  notebox: Yup.string().max(120, toLong),
});

const PaymentDetailsSchema = Yup.object().shape({
  cardHolderName: Yup.string()
    .min(2, toSmall)
    .max(50, toLong)
    .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, cardHolderReq)
    .required(required),
});

export {
  SignUpSchema,
  SocialSignUpSchema,
  LoginSchema,
  ForgotSchema,
  RateSchema,
  ResetSchema,
  TripSchema,
  checkAvailability,
  EditProfileSchema,
  InterviewSchema,
  PrivateInfoSchemaStepOne,
  PrivateInfoSchemaStepTwo,
  TripDetailsSchema,
  PaymentDetailsSchema,
};
