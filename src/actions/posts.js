import {
  UPDATE_POST,
  ADD_POST,
  START_POSTING,
  CREATE_COMMENT,
  POST_LIKE,
  POST_DISLIKE,
  COMMENT_LIKE,
  COMMENT_DISLIKE,
} from './actionType';
import { apiurls } from '../helpers/API-URL';
import { getFormBody } from '../helpers/utilities';
export function fetchPost() {
  const url = apiurls.posts(2, 15);
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
export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}
export function startPosting() {
  return {
    type: START_POSTING,
  };
}
export function createPost(content) {
  const url = apiurls.addPost();
  return (dispatch) => {
    dispatch(startPosting());
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: getFormBody({ content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.post);
        dispatch(addPost(data.data.post));
      });
  };
}
export function addComment(comment, id) {
  return {
    type: CREATE_COMMENT,
    comment,
    id,
  };
}
export function createComment(post_id, content) {
  const url = apiurls.PostComment();
  console.log(url);
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.token}`,
      },
      body: getFormBody({ post_id, content }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data.comment);
        dispatch(addComment(data.data.comment, post_id));
      });
  };
}
export function postLike(post, user) {
  return {
    type: POST_LIKE,
    user,
    post,
  };
}
export function postDislike(post, user) {
  return {
    type: POST_DISLIKE,
    user,
    post,
  };
}
export function postLikeToggle(post, likeType, user) {
  const url = apiurls.toggleLike(post, likeType);
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.data.deleted) {
            dispatch(postDislike(post, user));
          } else {
            dispatch(postLike(post, user));
          }
        }
      });
  };
}
export function commentDislike(comment, user, post) {
  return {
    type: COMMENT_DISLIKE,
    comment,
    user,
    post,
  };
}
export function commentLike(comment, user, post) {
  return {
    type: COMMENT_LIKE,
    comment,
    user,
    post,
  };
}
export function commentToggleLike(comment, likeType, user, post) {
  const url = apiurls.toggleLike(comment, likeType);
  return (dispatch) => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          if (data.data.deleted) {
            dispatch(commentDislike(comment, user, post));
          } else {
            dispatch(commentLike(comment, user, post));
          }
        }
      });
  };
}
