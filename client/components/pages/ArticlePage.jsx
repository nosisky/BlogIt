import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement, htmlparser2
} from 'react-html-parser';
import swal from 'sweetalert';

import NavBar from '../includes/NavBar';
import { logoutAction } from '../../actions/UserActions';
import { getArticle, deleteArticle } from '../../actions/ArticleActions';
import Footer from '../includes/Footer';

class ArticlePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: '',
      comment: false,
      renderEditor: false
    }
    this.activateComment = this.activateComment.bind(this);
    this.deleteHandler = this.deleteHandler.bind(this);
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

  deleteHandler() {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover it back!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then((willDelete) => {
      if (willDelete) {
        this.props.deleteArticle({ articleId: this.props.article._id })
          .then((response) => {
            swal(response, { icon: 'success' })
              .then(() => {
                this.props.history.push('/')
              })
          });
      } else {
        swal('Article was not deleted');
      }
    });
  }


  render() {
    const { title, author, time, content } = this.props.article;
    const newTime = moment(time).format('Do MMMM YYYY');
    return (
      <div>
        <NavBar
          logout={this.props.logoutAction}
          authenticated={this.props.isAuthenticated}
        />

        <div>

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
            {this.props.isAuthenticated && <div className="fixed-action-btn">
              <a className="btn-floating btn-large red">
                <i className="large material-icons">settings</i>
              </a>
              <ul>
                <li><Link to={`/edit/${this.props.match.params.slug}`}
                  className="btn-floating black"

                ><i className="material-icons">mode_edit</i></Link></li>
                <li><a onClick={this.deleteHandler}
                  className="btn-floating red darken-1">
                  <i className="material-icons">delete</i></a></li>
              </ul>
            </div>}

          </div>
          <Footer />
        </div>

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
  getArticle,
  deleteArticle
})(ArticlePage);

