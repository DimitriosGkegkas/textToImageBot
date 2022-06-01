import fetch from 'dva/fetch';
import { BASE_URL } from '../../settings'

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

//Need to set headers to local storage to pass them to the rest of the app this functionality should be expanded to handle an array of headers
//that we want to be saved on  local storage and not just the hardcoded one
function checkHeaders(response) {
  if (response.headers.has('x-total-count')) {
    localStorage.setItem('totalCount', response.headers.get('x-total-count'));
  }
  return response
}
/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param  {boolean} authentication If the request should use authentication default false
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options, authentication = false) {
  options.headers = options.headers || {};
  options.headers['Accept'] = 'application/json';
  options.headers['Content-Type'] = 'application/json';
  if (authentication) {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Tried to use authentication without token!');
    }
    options.headers['X-Access-Token'] = token;
  }
  return fetch(BASE_URL + url, options)
    .then(checkHeaders)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
}
