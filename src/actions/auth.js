import { apiurls } from '../helpers/API-URL';
import { getFormBody } from '../helpers/utilities';
import {
  LOGIN_START,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOG_OUT,
  CLEAR_AUTH_STATE,
} from './actionType';

export function loginStart() {
  return {
    type: LOGIN_START,
  };
}
export function loginfailed(error) {
  return {
    type: LOGIN_FAILED,
    error,
  };
}
export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}
export function logout() {
  return {
    type: LOG_OUT,
  };
}
export function login(email, password) {
  const url = apiurls.login();
  return (dispatch) => {
    dispatch(loginStart());
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }), //URL Creation fetch-url/usermane=Manas%20%kr&pass=9393939
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.data.token);
          dispatch(loginSuccess(data.data.user));
        } else {
          dispatch(loginfailed(data.message));
        }
      });
  };
}
export function signup(email, name, password, confirm_password) {
  const url = apiurls.signup();
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: getFormBody({ name, email, password, confirm_password }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}
export function clearAuth() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}
