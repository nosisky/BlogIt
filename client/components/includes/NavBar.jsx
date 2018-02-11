import React from 'react';
import LoginForm from '../auth/LoginForm';
import RegisterationForm from '../auth/RegisterationForm';
import NewArticle from '../includes/NewArticle';
const NavBar = ({ user, authenticated, logout }) => {

	return (
		<div>
			<nav>
				<div className="nav-wrapper">
					<a href="#" className="brand-logo">
						BlogIt
					</a>
					<ul id="nav-mobile" className="right hide-on-med-and-down">
						{!authenticated && (
							<li>
								<a className="modal-trigger" href="#login_form">
									Login
								</a>
							</li>
						)}

						{!authenticated && (
							<li>
								<a className="modal-trigger" href="#reg_form">
									Register
								</a>
							</li>
						)}

						{authenticated && (
							<li>
								<a className="modal-trigger" href="#add_article">
									Add Article
								</a>
							</li>
						)}

						{authenticated && (
							<li>
								<a onClick={logout}>Logout</a>
							</li>
						)}
					</ul>

					<ul id="slide-out" className="side-nav">
						<li>
							{!authenticated && (
								<a className="modal-trigger" href="#login_form">
									Login
								</a>
							)}
						</li>
						{!authenticated && (
							<li>
								<a className="modal-trigger" href="#reg_form">
									Register
								</a>
							</li>
						)}
						{authenticated && (
							<li>
								<a className="modal-trigger" href="#add_article">
									Add Article
								</a>
							</li>
						)}

						{authenticated && (
							<li>
								<a onClick={logout}>Logout</a>
							</li>
						)}
					</ul>
					<a href="#" data-activates="slide-out" className="button-collapse">
						<i className="material-icons">menu</i>
					</a>
				</div>
			</nav>
			<LoginForm />
			<RegisterationForm />
			<NewArticle />
		</div>
	);
};

export default NavBar;
