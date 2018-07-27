import * as Yup from 'yup';

const email = 'email',
  required = 'required',
  toSmall = 'tooSmall',
  toLong = 'tooLong',
  matchPassword = 'matchPassword',
  passwordReq = 'passwordReq',
  phoneNumberReq = 'phoneNumberReq',
  zipReq = 'zipReq',
  bankAccountNumberReq = 'bankAccountNumberReq',
  onlyNumbers = 'onlyNumbers',
  onlyLetters = 'onlyLetters';

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

const PrivateInfoSchema = Yup.object().shape({
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
    .min(16, toSmall)
    .max(16, toLong)
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
    .min(23, toSmall)
    .max(23, toLong)
    .matches(/^[C][H][0-9]*$/, bankAccountNumberReq)
    .required(required),
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
  expersises: Yup.array()
    .of(Yup.string())
    .required(required),
  occasion: Yup.array()
    .of(Yup.string())
    .required(required),
  languages: Yup.array()
    .of(Yup.string())
    .required(required),
  currency: Yup.number().required(required),
  hourlyRate: Yup.number()
    .typeError(onlyNumbers)
    .required(required),
});

export {
  SignUpSchema,
  SocialSignUpSchema,
  LoginSchema,
  ForgotSchema,
  ResetSchema,
  EditProfileSchema,
  InterviewSchema,
  PrivateInfoSchema,
};
