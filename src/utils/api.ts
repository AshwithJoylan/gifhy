import { Get, Post } from '@types';

const ApiMethods = {
  POST: 'POST',
  GET: 'GET',
};

const EndPoints = {
  TRENDING: 'trending',
  SEARCH: 'search',
};

const API_KEY = 'Zg8fPHnwKrNtBvY9AKYl1Iln4ukQNVDV';

const BASE_URL = 'https://api.giphy.com/v1/gifs/';

/**
 * combines base url with sub url
 * @param url sub url
 * @returns api url
 */
const getCombinedUrl = (url: string, params?: URLSearchParams) =>
  BASE_URL + url + '?' + (params ? new URLSearchParams(params).toString() : '');

/**
 * Gets Error object from the error
 * @param err Error from catch block
 * @returns error object
 */
const getError = (err: any) => {
  return {
    status: err.status || 501,
    message: err.message,
    error: err.status ? err : 'something went wrong',
  };
};

const post: Post = (url, data, signal) =>
  new Promise(async (resolve, reject) => {
    const apiUrl = getCombinedUrl(url);
    const body = (data ? JSON.stringify(data) : {}) as any;
    try {
      const response = await fetch(apiUrl, {
        method: ApiMethods.POST,
        signal,
        body,
      });
      const data = await response.json();
      if (response.status === 200) {
        resolve({
          status: response.status,
          data: data.data,
        });
      } else {
        reject({
          status: response.status,
          message: data.message,
          data: data.data,
        });
      }
    } catch (error) {
      console.log('error:', error);
      const err = getError(error);
      reject(err);
    }
  });

const get: Get = (url, params, signal) =>
  new Promise(async (resolve, reject) => {
    if (!!params) {
      params.api_key = API_KEY;
    }
    console.log('params:', params);
    const apiUrl = getCombinedUrl(url, params);
    console.log('apiUrl:', apiUrl);
    try {
      const response = await fetch(apiUrl, {
        method: ApiMethods.GET,
        signal,
      });
      const data = await response.json();
      if (response.status === 200) {
        resolve({
          status: response.status,
          data: data,
        });
      } else {
        reject({
          status: response.status,
          message: data.message,
          data: data,
        });
      }
    } catch (error) {
      const err = getError(error);
      reject(err);
    }
  });

const Api = {
  post,
  get,
  getError,
  EndPoints,
  ApiMethods,
  API_KEY,
  BASE_URL,
  getCombinedUrl,
};

export default Api;
