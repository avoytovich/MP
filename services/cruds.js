import { buildCRUD } from './api';

export const register = buildCRUD('register');
export const socialLogin = buildCRUD('authenticate/social');
export const socialSignUp = buildCRUD('social/signup');