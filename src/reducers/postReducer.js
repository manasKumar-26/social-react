import {
  UPDATE_POST,
  ADD_POST,
  START_POSTING,
  CREATE_COMMENT,
} from '../actions/actionType';
const initialState = {
  posts: [],
  inProgress: false,
};
export default function posts(state = initialState, action) {
  switch (action.type) {
    case UPDATE_POST:
      return {
        posts: action.posts,
      };
    case ADD_POST:
      return {
        ...state,
        posts: [action.post, ...state.posts],
        inProgress: false,
      };
    case START_POSTING: {
      return {
        ...state,
        inProgress: true,
      };
    }
    case CREATE_COMMENT:
      const newPosts = state.posts.map((post) => {
        if (post._id === action.id) {
          return {
            ...post,
            comments: [action.comment, ...post.comments],
          };
        }
        return post;
      });
      return {
        ...state,
        posts: newPosts,
      };
    default:
      return state;
  }
}
