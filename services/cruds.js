import { buildCRUD } from './api';

export const register = buildCRUD('register');
export const socialLogin = buildCRUD('authenticate/social');
export const authenticate = buildCRUD('authenticate');
export const socialSignUp = buildCRUD('social/signup');
export const activate = buildCRUD('activate');
export const resetPassword = buildCRUD('account/reset-password');
export const account = buildCRUD('account');
export const interview = buildCRUD('interviews');
export const currencies = buildCRUD('currencies');
export const languages = buildCRUD('languages');
export const profashionals = buildCRUD('profashionals');
export const cities = buildCRUD('cities');
