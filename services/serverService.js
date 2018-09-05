import qs from 'qs';
import { isEmpty } from 'lodash';

export default function isServer() {
  if (!process.browser) return true;
  return false;
}

export function setLocale(key, value) {
  if (!isServer()) localStorage.setItem(key, value);
}

export function getLocale(key) {
  if (!isServer()) return localStorage.getItem(key);
  return undefined;
}

export function clear(key) {
  if (!isServer()) return localStorage.clear(key);
  return undefined;
}

export function changeQuery(router, name = 'modal', newValue) {
  const index = router.asPath.indexOf('?');
  const query =
    index !== -1 ? qs.parse(router.asPath.substring(index + 1)) : {};
  query[name] && delete query[name];
  if (newValue) query[name] = newValue;
  const newUrl =
    index !== -1
      ? `${router.asPath.substring(0, index)}${
          !isEmpty(query) ? `?${qs.stringify(query)}` : ''
        }`
      : `${router.asPath}${!isEmpty(query) ? `?${qs.stringify(query)}` : ''}`;
  return newUrl;
}
