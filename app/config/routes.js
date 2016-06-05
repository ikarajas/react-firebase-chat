import React from "react";
import ReactRouter from "react-router";
import ChatContainer from "../ChatContainer.js";
import EditUserDetails from "../EditUserDetails.js";

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Main from "../Main";
import Home from "../Home";

var routes = (
	<Router history={hashHistory}>
		<Route path="/" component={Main}>
			<IndexRoute component={Home} />
			<Route path="edit-user-details" header="Edit user details" component={EditUserDetails} />
		</Route>
	</Router>
	);

module.exports = routes;