import * as Yup from 'yup';

const email = 'email',
  required = 'required',
  toSmall = 'toSmall',
  toLong = 'toLong',
  matchPassword = 'matchPassword',
  passwordReq = 'passwordReq',
  onlyLetters = 'onlyLetters';

function equalTo(ref, msg) {
  return Yup.mixed().test({
    name: 'equalTo',
    exclusive: false,
    message: msg || '${path} must be the same as ${reference}',
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

export { SignUpSchema, SocialSignUpSchema };