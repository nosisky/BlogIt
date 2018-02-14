import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerAction } from '../../actions/UserActions';

class RegisterationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event){
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event){
    event.preventDefault();
    this.props.registerAction(this.state);
  }

  render() {
    return (
      <div>
        <div id="reg_form" className="modal">
          <div className="modal-content">
            <h5 className="center-align">Sign up</h5>
            <div className="row">
              <form onSubmit={this.onSubmit} className="col s12">
                <div className="row">
                  <div className="input-field col s12">
                    <i className="material-icons prefix">account_circle</i>
                    <input
                      pattern=".{4,}"
                      title="4 characters minimum"
                      name="username"
                      onChange={this.onChange}
                      id="username"
                      type="text"
                      className="validate"
                      required
                    />
                    <label htmlFor="icon_prefix">Username</label>
                  </div>

                  <div className="input-field col s12">
                    <i className="material-icons prefix">contact_mail</i>
                    <input
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                      title="a valid email, e.g: hello@gmail.com"
                      name="email"
                      onChange={this.onChange}
                      id="email"
                      type="text"
                      className="validate"
                      required
                    />
                    <label htmlFor="icon_prefix">Email</label>
                  </div>

                  <div className="input-field col s12">
                    <i className="material-icons prefix">vpn_key</i>
                    <input
                      name="password"
                      onChange={this.onChange}
                      id="password"
                      type="password"
                      className="validate"
                      pattern=".{4,}"
                      title="4 characters minimum"
                      required
                    />
                    <label htmlFor="icon_prefix">Password</label>
                  </div>

                  <div className="input-field col s12">
                    <i className="material-icons prefix">vpn_key</i>
                    <input
                      name="passwordConfirm"
                      onChange={this.onChange}
                      id="passwordConfirm"
                      type="password"
                      className="validate"
                      required
                    />
                    <label htmlFor="icon_prefix">Confirm Password</label>
                  </div>
                </div>
                <button className="btn right red">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { registerAction })(RegisterationForm);
