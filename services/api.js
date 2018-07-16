import axios from 'axios';
import { get as getParam } from 'lodash';

import { Router } from '../routes';

import { SERVER_URL } from '../constants/global';
import { DEFAULT_LIST_SIZE } from '../constants/common';

export const getAuthHeaders = () => ({
  Authorization: `Bearer ${sessionStorage.getItem('token')}`,
  'Access-Control-Allow-Origin': '*', // temp
});

const getDefHeaders = () => ({
  'Content-Type': 'application/json',
  ...getAuthHeaders(),
});

export const FORM_DATA_HEADERS = {
  'Content-Type': 'multipart/form-data',
};

export const checkError = error => {
  const status = getParam(error, 'response.status');
  // if (status >= 401 && status <= 403) {
  //   Router.pushRoute('/login');
  // }
  return Promise.reject(error);
};

const buildUrl = url => {
  if (url.indexOf(SERVER_URL) === -1) {
    return SERVER_URL + url;
  }
  return url;
};

export const wrapRequest = options =>
  axios({
    headers: getDefHeaders(),
    ...options,
    url: buildUrl(options.url || options),
  }).catch(checkError);

export const buildCRUD = url => {
  if (!url) return Promise.reject('Need URL');
  return {
    post: (data, plusUrl = '') => {
      if (!data) return Promise.reject('Need Data');
      return wrapRequest({ method: 'POST', url: url + plusUrl, data });
    },
    put: (id, data) => {
      if (!data || !id) return Promise.reject('Need Data or id');
      return wrapRequest({ method: 'PUT', url: `${url}/${id}`, data });
    },
    deleteRequest: id => {
      if (!id) return Promise.reject('Need id');
      return wrapRequest({ method: 'DELETE', url: `${url}/${id}` });
    },
    get: id => {
      if (!id) return Promise.reject('Need id');
      return wrapRequest({ method: 'GET', url: `${url}/${id}` });
    },
    getList: (opt = {}, data) => {
      const {
        params: notSpredParams = {},
        additionalUrl,
        method = 'GET',
        paramsSerializer,
      } = opt;
      const params = { ...notSpredParams };
      if (params.page === undefined) {
        params.page = 0;
      }
      if (params.pageSize === undefined) {
        params.pageSize = DEFAULT_LIST_SIZE;
      }
      let sendUrl = url;
      if (additionalUrl) {
        sendUrl += `/${additionalUrl}`;
      }
      return wrapRequest({
        method,
        url: sendUrl,
        params,
        paramsSerializer,
        data,
      });
    },
  };
};