import {
  CLEAR_AUTH_STATE,
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOG_OUT,
  EDIT_SUCCESS,
  EDIT_FAIL,
} from '../actions/actionType';

const initialAuthState = {
  user: {},
  isLoggedIn: false,
  inProgress: false,
  error: null,
};
export default function Auth(state = initialAuthState, action) {
  switch (action.type) {
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        error: null,
      };
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isLoggedIn: true,
        inProgress: false,
        error: null,
      };
    case EDIT_SUCCESS:
      return {
        ...state,
        user: action.user,
        error: false,
      };
    case EDIT_FAIL:
      return {
        ...state,
        error: action.error,
      };
    case LOG_OUT: {
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
}
