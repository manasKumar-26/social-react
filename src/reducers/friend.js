import {
  ADD_FRIEND,
  FETCH_FRIENDS,
  FETCH_FRIENDS_START,
  REMOVE_FRIEND,
} from '../actions/actionType';
const initialState = {
  friends: [],
  inProgress: false,
  addFriendsStart: false,
  removingFriendStart: false,
};
export default function friends(state = initialState, action) {
  switch (action.type) {
    case FETCH_FRIENDS:
      return {
        ...state,
        friends: action.friends,
        inProgress: false,
        addFriendsStart: false,
        removingFriendStart: false,
      };
    case FETCH_FRIENDS_START:
      return {
        ...state,
        inProgress: true,
      };
    case ADD_FRIEND:
      return {
        ...state,
        addFriendsStart: true,
      };
    case REMOVE_FRIEND:
      return {
        ...state,
        removingFriendStart: true,
      };

    default:
      return state;
  }
}
