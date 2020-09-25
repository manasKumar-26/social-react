import { FETCH_FRIENDS, FETCH_FRIENDS_START, ADD_FRIEND } from './actionType';
import { apiurls } from '../helpers/API-URL';
export function friendSuccess(friends) {
  return {
    type: FETCH_FRIENDS,
    friends,
  };
}
export function fetchFriendsstart() {
  return {
    type: FETCH_FRIENDS_START,
  };
}
export function fetchFriends() {
  const url = apiurls.friends();
  return (dispatch) => {
    dispatch(fetchFriendsstart());
    fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          dispatch(friendSuccess(data.data.friends));
        }
      });
  };
}
export function addfriend() {
  return {
    type: ADD_FRIEND,
  };
}
export function addFriendRequest(id) {
  const url = apiurls.addfriend(id);
  return (dispatch) => {
    dispatch(addfriend());
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // dispatch(addfriend(data.data.friendship));
        dispatch(fetchFriends());
      });
  };
}
