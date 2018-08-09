import { getLocale } from './serverService';

function isILogined() {
  if (getLocale('id_token') && getLocale('refresh_token')) {
    return true;
  }
  return false;
}

function getMyFirstAndLastName() {
  return `${getLocale('firstName')} ${getLocale('lastName')}`;
}

function getMyPhoto() {
  return `${getLocale('avaUrl')}`;
}

function amIProfashional() {
  if (
    getLocale('authorities') &&
    JSON.parse(getLocale('authorities')).indexOf('ROLE_PROFASHIONAL') !== -1
  ) {
    return true;
  }
  return false;
}

export { isILogined, amIProfashional, getMyFirstAndLastName, getMyPhoto };
