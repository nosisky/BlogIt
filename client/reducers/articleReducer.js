import { GET_ALL_ARTICLES } from '../actions/ActionTypes';

const initialState = {
	articles: []
};

function articleReducer(state = initialState, actions) {
	switch (action.type) {
		case GET_ALL_ARTICLES: {
			return {
				...state,
				articles: state.allArticles
			};
		}
	}
}
