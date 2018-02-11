import axios from 'axios';
import { setApiCallProgress } from './UserActions';
import { GET_ALL_ARTICLES, ADD_ARTICLES, GET_ONE_ARTICLE } from './ActionTypes';

const apiUrl = '/api/v1/articles';

export function getAllArticles() {
	setApiCallProgress(true);
	return (dispatch) =>
		axios
			.get(apiUrl)
			.then((response) => {
				setApiCallProgress(false);
				dispatch({
					type: GET_ALL_ARTICLES,
					allArticles: response.data
				});
			})
			.catch((error) => {
				setApiCallProgress(false);
				Materialize.toast(error.response.data.message, '2000', 'red');
			});
}

export function addArticle(articleData) {
	return dispatch => axios.post(apiUrl, articleData)
		.then((response) => {
			dispatch({
				type: ADD_ARTICLES,
				article: response.data.article
			})
			$('.modal').modal('close');
			Materialize.toast(response.data.message, '2000');
		})
		.catch((error) => {
			$('.modal').modal('close');
		})
}

export function getArticle(slug) {
	return dispatch => axios.get(`${apiUrl}/${slug}`)
		.then((response) => {
			dispatch({
				type: GET_ONE_ARTICLE,
				article: response.data
			})
		})
		.catch((error) => {
			Materialize.toast(error.response.data.message, '2000', 'red')
		})
}
