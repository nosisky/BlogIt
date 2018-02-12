import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';
import commentReducer from './commentReducer';

const appReducer = combineReducers({
  auth: authReducer,
  articles: articleReducer,
  comments: commentReducer
});

const rootReducer = (state, action) => {
  if (action.type === 'unauth_user') {
    state.auth.user = {};
  }

  return appReducer(state, action);
};

export default rootReducer;
