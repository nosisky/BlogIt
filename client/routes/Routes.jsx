import React from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import App from '../components/App';
import NotFoundPage from '../components/pages/NotFoundPage';
import HomePage from '../components/pages/HomePage';
import ArticlePage from '../components/pages/ArticlePage';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/post/:slug" component={ArticlePage} />
			<Route path="*" component={NotFoundPage} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
