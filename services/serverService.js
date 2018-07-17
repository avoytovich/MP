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
