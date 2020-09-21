import { UPDATE_POST } from '../actions/actionType';
const initialState = {
  posts: [],
};
export default function posts(state = initialState, action) {
  switch (action.type) {
    case UPDATE_POST:
      return {
        posts: action.posts,
      };
    default:
      return state;
  }
}
