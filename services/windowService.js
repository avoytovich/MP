import isServer from './serverService';

function getWindowWidth() {
  if (!isServer()) {
    return window.innerWidth;
  }
  return undefined;
}

function isMobile(width = 460) {
  return getWindowWidth() < width;
}

export { getWindowWidth, isMobile };
