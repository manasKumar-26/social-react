import {
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
  FETCH_PROFILE_START,
  REMOVE_PROFILE,
} from '../actions/actionType';
const initialState = {
  user: {},
  inProgress: false,
  success: null,
  error: null,
};
export default function profile(state = initialState, action) {
  switch (action.type) {
    case USER_PROFILE_SUCCESS:
      return {
        ...state,
        user: action.user,
        inProgress: false,
        success: true,
        error: null,
      };
    case USER_PROFILE_FAIL:
      return {
        ...state,
        error: true,
        inProgress: false,
      };
    case FETCH_PROFILE_START:
      return {
        ...state,
        inProgress: true,
      };
    case REMOVE_PROFILE: {
      return {
        ...initialState,
      };
    }
    default:
      return state;
  }
}
