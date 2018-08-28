import axios from 'axios';
import { get as getParam } from 'lodash';
import qs from 'qs';

import { Router } from '../routes';

import { getLocale } from '../services/serverService';

import { SERVER_URL } from '../constants/global';
import { DEFAULT_LIST_SIZE } from '../constants/common';

export const getAuthHeaders = () => ({
  Authorization: `Bearer ${getLocale('id_token')}`,
  'Access-Control-Allow-Origin': '*', // temp
});

const getDefHeaders = () => ({
  'Content-Type': 'application/json',
  ...getAuthHeaders(),
});

export const getFormData = () => ({
  'Content-Type': 'multipart/form-data',
  ...getAuthHeaders(),
});

const buildUrl = url => {
  if (url.indexOf(SERVER_URL) === -1) {
    return SERVER_URL + url;
  }
  return url;
};

export const formData = options =>
  axios({
    headers: getFormData(),
    ...options,
    url: buildUrl(options.url || options),
  });

export const wrapRequest = options =>
  axios({
    headers: getDefHeaders(),
    ...options,
    url: buildUrl(options.url || options),
  });

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
    patch: (id, data) => {
      if (!data || !id) return Promise.reject('Need Data or id');
      return wrapRequest({ method: 'PATCH', url: `${url}/${id}`, data });
    },
    deleteRequest: data => {
      return wrapRequest({ method: 'DELETE', url: `${url}`, data });
    },
    get: (params = {}, plusUrl = '', needParamsSerializer) =>
      wrapRequest({
        method: 'GET',
        url: `${url}${plusUrl}`,
        params,
        paramsSerializer: needParamsSerializer
          ? par =>
              qs.stringify(par, { arrayFormat: 'indices', allowDots: true })
          : undefined,
      }),
    getWithId: (id, plusUrl = '') => {
      if (!id) return Promise.reject('Need id');
      return wrapRequest({ method: 'GET', url: `${url}/${id}${plusUrl}` });
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
