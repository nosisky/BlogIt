import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import { connect } from 'react-redux';
import NavBar from '../includes/NavBar';
import { getArticle, editArticle } from '../../actions/ArticleActions';


class EditArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: this.props.article.content,
      articleId: this.props.article._id,
      title: this.props.article.title
    };
    this.onChange = this.onChange.bind(this);
    this.editorOnChange = this.editorOnChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  editorOnChange(event) {
    this.setState({
      content: event.target.getContent()
    })
  };

  onSubmit(event) {
    event.preventDefault();
    this.props.editArticle(this.state)
      .then(() => {
        this.props.history.push('/');
      })
    this.editorOnChange;
  };

  render() {
    const { title, content } = this.state;
    return (
      <div>
        <NavBar
          logout={this.props.logoutAction}
          authenticated={this.props.isAuthenticated}
        />
        <div id="add_article">
          <h5 className="center-align">
            Edit Article
            </h5>
          <div className="row">
            <form className="col s12"
              onSubmit={this.onSubmit}
            >
              <div className="row">
                <div className="input-field col s12">
                  <input name="title" id="title" type="text"
                    onChange={this.onChange}
                    className="validate"
                    defaultValue={title}
                    required
                  />
                  <label htmlFor="icon_prefix">Title</label>
                </div>
              </div>
              <div className="row">
                <div className="col s12" />
                <TinyMCE
                  content={content}
                  config={{
                    plugins: 'autolink link image lists print preview',
                    toolbar:
                      'undo redo | bold italic | alignleft aligncenter alignright' | 'img'
                  }}
                  onChange={this.editorOnChange}
                />
              </div>
              <button className="btn right">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    isAuthenticated: state.auth.authenticated,
    article: state.articles.article
  };
}

export default connect(mapStateToProps, { getArticle, editArticle })(EditArticle);
