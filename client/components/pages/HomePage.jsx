import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader';

import NavBar from '../includes/NavBar';
import ArticleLists from '../includes/ArticleLists';
import { logoutAction } from '../../actions/UserActions';
import { getAllArticles } from '../../actions/ArticleActions';
import Footer from '../includes/Footer';

class HomePage extends Component {

  constructor(props) {
    super(props);
    this.renderArticles = this.renderArticles.bind(this);
  }
  componentDidMount() {
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true // Choose whether you can drag to open on touch screens,
    });
    $('.modal').modal();
    this.props.getAllArticles();
  }

  renderArticles() {
    let allArticles = this.props.articles.articles;

    if (allArticles.length < 1) {
      {
        this.props.apiStatus ? (
          <div className="preloader"></div>
        ) : (
          <div className="empty-notifier">
							There is no article in the database</div>
        );
      }
    } else {
      return allArticles.map((article) => {
        return (
          <ArticleLists
            title={article.title}
            key={article._id}
            slug={article.slug}
            content={article.content}
            username={article.author}
            time={article.createdDate}
          />
        )
      });
    }
  }

  render() {
    return (
      <div>
        <Loader loaded={!this.props.apiStatus}
          width={20} 
          radius={50}
        >
          <NavBar
            home={true}
            logout={this.props.logoutAction}
            authenticated={this.props.isAuthenticated}
            user={this.props.user}
          />
          <div className="row">
            {this.renderArticles()}
          </div>
          <Footer />
        </Loader>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.authenticated,
    articles: state.articles,
    apiStatus: state.auth.apiStatus
  };
}

export default connect(mapStateToProps, {
  logoutAction,
  getAllArticles
})(HomePage);
