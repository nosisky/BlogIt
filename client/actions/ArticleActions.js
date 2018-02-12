import axios from 'axios';
import { setApiCallProgress } from './UserActions';
import {
	GET_ALL_ARTICLES, ADD_ARTICLES,
	GET_ONE_ARTICLE, EDIT_ARTICLE, DELETE_ARTICLE
} from './ActionTypes';

const apiUrl = '/api/v1/articles';

export function getAllArticles() {
	return (dispatch) => {
		dispatch(setApiCallProgress(true))
		axios
			.get(apiUrl)
			.then((response) => {
				dispatch(setApiCallProgress(false));
				dispatch({
					type: GET_ALL_ARTICLES,
					allArticles: response.data
				});
			})
			.catch((error) => {
				dispatch(setApiCallProgress(false))
				Materialize.toast(error.response.data.message, '2000', 'red');
			});
	}
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

export function editArticle(articleData) {
	return dispatch => axios.put(apiUrl, articleData)
		.then((response) => {
			dispatch({
				type: EDIT_ARTICLE,
				article: response.data.updatedArticle
			})
			Materialize.toast(response.data.message, '2000');
		})
		.catch((error) => {
			Materialize.toast(error.response.data.message, '2000', 'red')
		})
}

export function deleteArticle(articleData) {
	return dispatch => axios.delete(apiUrl, { data: { articleId: articleData.articleId } })
		.then((response) => {
			dispatch({
				type: DELETE_ARTICLE,
				articleId: response.data._id
			})
			Materialize.toast(response.data.message, '2000');
		})
		.catch((error) => {
			Materialize.toast(error.response.data.message, '2000', 'red')
		})
}

export function getArticle(slug) {
	return dispatch => {
		dispatch(setApiCallProgress(true))
		axios.get(`${apiUrl}/${slug}`)
			.then((response) => {
				dispatch(setApiCallProgress(false))
				dispatch({
					type: GET_ONE_ARTICLE,
					article: response.data
				})
			})
			.catch((error) => {
				dispatch(setApiCallProgress(false))
				Materialize.toast(error.response.data.message, '2000', 'red')
			})
	}
}
