import { account } from './cruds';
import { setLocale } from './serverService';
import { Router } from '../routes';

export const saveToStorage = async res => {
  setLocale('id_token', res.data.id_token);
  setLocale('refresh_token', res.data.refresh_token);
  const accoutResp = await account.get();
  if (accoutResp.data.authorities.indexOf('ROLE_SHOPPER') !== -1) {
    Router.pushRoute('/shoper');
  } else {
    Router.pushRoute('/profashional');
  }
  return accoutResp;
};