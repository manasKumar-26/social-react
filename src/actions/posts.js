import { UPDATE_POST } from './actionType';
export function fetchPost() {
  const url = 'http://codeial.com:8000/api/v2/posts?page=3&limit=8';
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
