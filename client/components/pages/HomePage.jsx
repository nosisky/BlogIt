import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavBar from '../includes/NavBar';
import ArticleLists from '../includes/ArticleLists';
import { logoutAction } from '../../actions/UserActions';
import { getAllArticles } from '../../actions/ArticleActions';

class HomePage extends Component {
	componentDidMount() {
		this.props.getAllArticles();
	}
	render() {
		return (
			<div>
				<NavBar
					logout={this.props.logoutAction}
					authenticated={this.props.isAuthenticated}
					user={this.props.user}
				/>
				<ArticleLists />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.auth.user,
		isAuthenticated: state.auth.authenticated,
		articles: state.articles
	};
}

export default connect(mapStateToProps, {
	logoutAction,
	getAllArticles
})(HomePage);
