import isServer from './serverService';

function getWindowWidth() {
  if (!isServer()) {
    return window.outerWidth;
  }
  return undefined;
}

function isMobile() {
  return getWindowWidth() < 460;
}

export { getWindowWidth, isMobile };
