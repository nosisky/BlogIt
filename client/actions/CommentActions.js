import axios from 'axios';
import Materialize from 'materialize-css';

import { EDIT_COMMENT, DELETE_COMMENT, ADD_COMMENT } from './ActionTypes';

const apiUrl = '/api/v1/comments';

/**
 * @description - Add comment
 *
 * @export {addComment}
 *
 * @param {Object} commentData - comment data
 *
 * @returns {Promise} - Promise
 */
export function addComment(commentData) {
  return dispatch => axios.post(apiUrl, commentData)
    .then((response) => {
      dispatch({
        type: ADD_COMMENT,
        comment: response.data.comment
      });
      document.getElementById('comment_form').reset();      
      Materialize.toast(response.data.message, '2000');
    })
    .catch((error) => {
      Materialize.toast(error.response.data.message, '2000');
    });
}

/**
 * @description - Edit comment
 *
 * @export {editComment}
 *
 * @param {Object} commentData - comment data
 *
 * @returns {Promise} - Promise
 */
export function editComment(commentData) {
  return dispatch => axios.put(apiUrl, commentData)
    .then((response) => {
      dispatch({
        type: EDIT_COMMENT,
        comment: response.data.updatedComment
      });
      Materialize.toast(response.data.message, '2000');
    })
    .catch((error) => {
      Materialize.toast(error.response.data.message, '2000', 'red');
    });
}

/**
 * @description - delete comment
 *
 * @export {deleteComment}
 *
 * @param {Object} commentData - comment data
 *
 * @returns {Promise} - Promise
 */
export function deleteComment(commentData) {
  return dispatch => axios
    .delete(apiUrl, { data: { articleId: commentData.articleId } })
    .then((response) => {
      dispatch({
        type: DELETE_COMMENT,
        articleId: response.data._id
      });
      Materialize.toast(response.data.message, '2000');
    })
    .catch((error) => {
      Materialize.toast(error.response.data.message, '2000', 'red');
    });
}
