import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginAction } from '../../actions/UserActions';

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: ''
		};
	}

	onChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	onSubmit = (event) => {
		event.preventDefault();
		this.props.loginAction(this.state);
	};

	render() {
		return (
			<div>
				<div id="login_form" className="modal">
					<div className="modal-content">
						<h5 className="center-align">Login</h5>
						<div className="row">
							<form onSubmit={this.onSubmit} className="col s12">
								<div className="row">
									<div className="input-field col s12">
										<i className="material-icons prefix">account_circle</i>
										<input
											name="username"
											id="login_username"
											onChange={this.onChange}
											type="text"
											className="validate"
											required
										/>
										<label htmlFor="icon_prefix">Username</label>
									</div>
									<div className="input-field col s12">
										<i className="material-icons prefix">vpn_key</i>
										<input
											name="password"
											id="login_password"
											onChange={this.onChange}
											type="password"
											className="validate"
											required
										/>
										<label htmlFor="icon_prefix">Password</label>
									</div>
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

export default connect(null, { loginAction })(LoginForm);
