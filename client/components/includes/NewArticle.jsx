import React, { Component } from 'react';
import TinyMCE from 'react-tinymce';

class NewArticle extends Component {
	constructor(props) {
		super(props);
		this.state = {
			content: '',
			title: ''
		};
		this.onChange = this.onChange.bind(this);
	}

	onChange = (e) => {};

	render() {
		return (
			<div>
				<div id="add_article" className="modal">
					<div className="modal-content">
						<h5 className="center-align">Add Article</h5>
						<div className="row">
							<form className="col s12">
								<div className="row">
									<div className="input-field col s12">
										<input name="title" id="icon_prefix" type="text" className="validate" />
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
										onChange={this.onChange}
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

export default NewArticle;
