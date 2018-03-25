import React from 'react';
import {Switch, Route} from 'react-router';
import {BrowserRouter} from 'react-router-dom';
import App from './App';
import Match from './Match';
import Info from './Info';

export default () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route path="/:one/:two" exact component={Match} />
				<Route path="/info" exact component={Info} />
				<Route path="/" exact component={App} />
			</Switch>
		</BrowserRouter>
	);
};
