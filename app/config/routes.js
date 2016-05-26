import React from "react";
import ReactRouter from "react-router";
import ChatContainer from "../ChatContainer.js";
import PeopleManager from "../PeopleManager.js";

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Main from "../Main";
import Home from "../Home";

var routes = (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={Home} />
			<Route path="chat" header="Chat" component={ChatContainer} />
			<Route path="people" header="People" component={PeopleManager} />
		</Route>
	</Router>
	);

module.exports = routes;