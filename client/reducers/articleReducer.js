import { GET_ALL_ARTICLES, ADD_ARTICLES, GET_ONE_ARTICLE } from '../actions/ActionTypes';

const initialState = {
	articles: [],
	article: {}
};

function articleReducer(state = initialState, action) {
	switch (action.type) {
		case GET_ALL_ARTICLES: {
			return {
				...state,
				articles: action.allArticles
			};
		}
		case ADD_ARTICLES: {
			return {
				...state,
				articles: state.articles.concat([action.article])
			}
		}
		case GET_ONE_ARTICLE: {
			return {
				...state,
				article: action.article
			}
		}
		default: {
			return state;
		}
	}
}

export default articleReducer;
