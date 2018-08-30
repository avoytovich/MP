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

function myRoleIs() {
  if (
    getLocale('authorities') &&
    JSON.parse(getLocale('authorities')).indexOf('ROLE_PROFASHIONAL') !== -1
  ) {
    return 'profashional';
  }
  return 'shopper';
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

function amILogined() {
  if (getLocale('id_token')) {
    return true;
  }
  return false;
}

function isItMyPage(id) {
  if (getLocale('id') === id) {
    return true;
  }
  return false;
}

export {
  isILogined,
  amIProfashional,
  getMyFirstAndLastName,
  getMyPhoto,
  isItMyPage,
	myRoleIs,
  amILogined,
};
