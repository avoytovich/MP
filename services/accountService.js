import { getLocale } from './serverService';

function isILogined() {
  if (getLocale('id_token') && getLocale('refresh_token')) {
    return true;
  }
  return false;
}

export { isILogined };
