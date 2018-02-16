import React, { Component } from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';

import { editComment, deleteComment } from '../../actions/CommentActions';
import { getArticle } from '../../actions/ArticleActions';

class CommentList extends Component {
  constructor( props ) {
    super( props );
    this.editComment = this.editComment.bind( this );
    this.deleteComment = this.deleteComment.bind( this );
    this.onClick = this.onClick.bind( this );
    this.onChange = this.onChange.bind( this );
    this.state = {
      commentEdit: false,
      comment: this.props.comment,
      commentId: this.props.id
    }
  }

  onClick() {
    this.setState( {
      commentEdit: !this.state.commentEdit
    } )
  }

  onChange( event ) {
    this.setState( {
      comment: event.target.value
    } )
  }

  editComment( event ) {
    event.preventDefault();
    this.props.editComment( this.state )
      .then( () => {
        this.props.getArticle( this.props.slug )
      } )
  }

  deleteComment() {
    swal( {
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover it back!',
      icon: 'warning',
      buttons: true,
      dangerMode: true
    } ).then( ( willDelete ) => {
      if ( willDelete ) {
        this.props.deleteComment( this.state.commentId )
          .then( () => {
            this.props.getArticle( this.props.slug )
          } )
      }
    } );
  }

  render() {
    return (
      <div>
        {
          !this.state.commentEdit && <div>
            <div className="row">
              <div className="col s12 l9 m9"
                style={ { textTransform: 'Capitalize' } }>
                By: <a href="#">{ this.props.author }</a>
              </div>

              <div className="col s12 l3 m3 time">
                { this.props.time }
              </div>
            </div>
            <div className="row">
              <div className="col s12 l9 m9">
                { this.props.comment }
              </div>
              { this.props.isAdmin === 1
                && <span><a onClick={ this.onClick }>Edit</a>

                  <a className="right" onClick={ this.deleteComment }>
                    Delete</a></span> }

            </div>
          </div>
        }

        { this.state.commentEdit &&
          <form name="comment-editor" onSubmit={ this.editComment }>
            <input type="text" name="comment"
              onChange={ this.onChange }
              defaultValue={ this.props.comment } />
            <button className="btn red" type="submit">Submit</button>
            <a
              onClick={ this.onClick }
              className="right" type="submit">X</a>
          </form> }

      </div>
    );
  }
}

export default connect( null, {
  editComment, getArticle,
  deleteComment
} )( CommentList );

