import posts from './postReducer';
import auth from './auth';
import { combineReducers } from 'redux';
export default combineReducers({
  posts,
  auth,
});
