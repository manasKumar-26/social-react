import posts from './postReducer';
import auth from './auth';
import profile from './profile';
import friends from './friend';
import { combineReducers } from 'redux';
export default combineReducers({
  posts,
  auth,
  profile,
  friends,
});
