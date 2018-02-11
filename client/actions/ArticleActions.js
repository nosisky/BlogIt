import axios from 'axios';
import { GET_ALL_ARTICLES } from './ActionTypes';
import { setApiCallProgress } from './userActions';

export function getAllArticles() {
	return (dispatch) => setApiCallProgress(true);
	axios
		.get('/api/v1/articles')
		.then((response) => {
			setApiCallProgress(false);
			dispatch({
				type: GET_ALL_ARTICLES,
				allArticles: response.data
			});
		})
		.catch((error) => {
			Materialize.toast(error.response.data.message, '2000', 'red');
		});
}
