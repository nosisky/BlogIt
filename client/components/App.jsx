import React, { Component } from 'react';

import Routes from '../routes/Routes';

import { BrowserRouter as Router } from 'react-router-dom';

/**
 * @description - Main Application component
 * 
 * @export {Object}
 * 
 * @class App
 * 
 * @extends {Component}
 */
export default class App extends Component {
	render() {
		return (
			<Router>
				<Routes />
			</Router>
		);
	}
}
