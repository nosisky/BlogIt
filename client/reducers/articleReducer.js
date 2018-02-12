import {
  GET_ALL_ARTICLES, ADD_ARTICLES,
  GET_ONE_ARTICLE, EDIT_ARTICLE, DELETE_ARTICLE
} from '../actions/ActionTypes';
import { editArticle } from '../actions/ArticleActions';

const initialState = {
  articles: [],
  article: {}
};

/**
 * @description -Article reducer
 *
 * @param {Object} [state=initialState]  - Application state
 *
 * @param {Object} action - Action object
 *
 * @returns {Object} - reducer response
 */
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
    };
  }
  case GET_ONE_ARTICLE: {
    return {
      ...state,
      article: action.article
    };
  }
  case EDIT_ARTICLE: {
    const editedArticle = [];
    state.articles.map((article) => {
      if (article._id === action.article._id) {
        editedArticle.push(action.article);
      } else {
        editedArticle.push(article);
      }
    });
    return { ...state, allArticles: editedArticle };
  }
  case DELETE_ARTICLE: {
    const newState = state.articles
      .filter(article => article._id !== action.articleId);
    return { ...state, articles: newState };
  }
  default: {
    return state;
  }
  }
}

export default articleReducer;
