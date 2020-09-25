import { apiurls } from '../helpers/API-URL';
import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  FETCH_PROFILE_START,
} from './actionType';
export function userSuccess(user) {
  return {
    type: USER_PROFILE_SUCCESS,
    user,
  };
}
export function userFail(error) {
  return {
    type: USER_PROFILE_FAIL,
    error,
  };
}
export function fetchStart() {
  return {
    type: FETCH_PROFILE_START,
  };
}
// export function removeProfile() {
//   return {
//     type: REMOVE_PROFILE,
//   };
// }
export function fetchProfile(id) {
  const url = apiurls.profile(id);
  return (dispatch) => {
    dispatch(fetchStart());
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch(userSuccess(data.data.user));
        } else {
          dispatch(userFail(data.message));
        }
      });
  };
}
