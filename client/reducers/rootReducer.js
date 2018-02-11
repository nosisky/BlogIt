import { combineReducers } from 'redux';
import authReducer from './authReducer';
import articleReducer from './articleReducer';

const appReducer = combineReducers({
	auth: authReducer,
	articles: articleReducer
});

const rootReducer = (state, action) => {
	if (action.type === 'unauth_user') {
		state.auth.user = {};
	}

	return appReducer(state, action);
};

export default rootReducer;
