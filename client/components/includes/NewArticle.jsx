import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';
import { connect } from 'react-redux';

import { addArticle, getArticle } from '../../actions/ArticleActions';

class NewArticle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			title: ''
		};
		this.onChange = this.onChange.bind(this);
		this.editorOnChange = this.editorOnChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
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
		this.editorOnChange;

		this.props.addArticle(this.state)
	};

	render() {
		return (
			<div>
				<div id="add_article" className="modal">
					<div className="modal-content">
						<h5 className="center-align">
							Add Article
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
											required
										/>
										<label htmlFor="icon_prefix">Title</label>
									</div>
								</div>
								<div className="row">
									<div className="col s12" />
									<TinyMCE
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
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.auth.user,
		isAuthenticated: state.auth.authenticated,
	};
}

export default connect(mapStateToProps, { addArticle, getArticle })(NewArticle);
