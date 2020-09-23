import { UPDATE_POST } from './actionType';
import { apiurls } from '../helpers/API-URL';
export function fetchPost() {
  const url = apiurls.posts(3, 8);
  return (dispatch) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch(updatePost(data.data.posts));
      });
  };
}
export function updatePost(posts) {
  return {
    type: UPDATE_POST,
    posts,
  };
}
