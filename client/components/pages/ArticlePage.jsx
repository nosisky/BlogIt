import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement, htmlparser2
} from 'react-html-parser';

import NavBar from '../includes/NavBar';
import { logoutAction } from '../../actions/UserActions';
import { getArticle } from '../../actions/ArticleActions';
import NewArticle from '../includes/NewArticle';
import Footer from '../includes/Footer';



class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      comment: false
    }
    this.activateComment = this.activateComment.bind(this);
  }

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
  activateComment() {
    this.setState({
      comment: !this.state.comment
    })
  }
  render() {
    const { title, author, time, content } = this.props.article;
    const newTime = moment(time).format('Do MMMM YYYY');

    return (
      <div>
        {typeof title !== 'undefined' &&
          <NewArticle
            editor={true}
            title={title}
            content={content}
          />}
        <NavBar
          editor={true}
          logout={this.props.logoutAction}
          authenticated={this.props.isAuthenticated}
        />
        <div className="row article-section-left">
          <img src="http://demo.geekslabs.com/materialize-v1.0/images/avatar.jpg" className="img-blog" />
          <a href="#">{author}</a>
          <div className="time">{newTime}</div>
        </div>
        <div className="article-section text-center">
          <h3> {title}</h3>
          {ReactHtmlParser(content)}
          <div className="divider"></div>
          {!this.state.comment &&
            <button
              onClick={this.activateComment}
              className="btn red">Add comment</button>
          }
          {
            this.state.comment &&
            <form>
              <textarea id="comment" className="materialize-textarea"
                placeholder="Add comment"></textarea>
              <button className="btn red">Submit</button>
            </form>
          }
          <div className="fixed-action-btn">
            <a className="btn-floating btn-large red">
              <i className="large material-icons">settings</i>
            </a>
            <ul>
              <li><a className="btn-floating black modal-trigger"
                href="#add_article"><i className="material-icons">mode_edit</i></a></li>
              <li><a className="btn-floating red darken-1">
                <i className="material-icons">delete</i></a></li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.authenticated,
    article: state.articles.article,
    apiStatus: state.auth.apiStatus
  };
}

export default connect(mapStateToProps, {
  logoutAction,
  getArticle
})(ArticlePage);

