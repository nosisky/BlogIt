import React, { Component } from 'react';
import { connect } from 'react-redux';
import NavBar from '../includes/NavBar';
import { logoutAction } from '../../actions/UserActions';
import { getArticle } from '../../actions/ArticleActions';


class ArticlePage extends Component {
  componentDidMount() {
    this.props.getArticle(this.props.match.params.slug)
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens,
    });
    $('.modal').modal();
  }
  render() {
    const { tile, author, time, content } = this.props.article;
    return (
      <div>
        <NavBar
          logout={this.props.logoutAction}
          authenticated={this.props.isAuthenticated}
        />
        <div className="article-section text-center">
          {title}
        </div>
        <div className="article-section text-center">
          {content}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.authenticated,
    article: state.article.article,
    apiStatus: state.auth.apiStatus
  };
}

export default connect(mapStateToProps, {
  logoutAction,
  getArticle
})(ArticlePage);

