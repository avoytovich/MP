import { buildCRUD } from './api';

export const register = buildCRUD('register');
export const socialLogin = buildCRUD('authenticate/social');
export const authenticate = buildCRUD('authenticate');
export const socialSignUp = buildCRUD('social/signup');
export const resetPassword = buildCRUD('account/reset-password');
