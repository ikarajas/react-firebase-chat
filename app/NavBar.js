import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";

class NavBar extends React.Component {
	render() {
		return (
			<div>
				<Link to="/">
					<h2>Home</h2>
				</Link>
				<Link to="/people">
					<h2>Users</h2>
				</Link>
			</div>
		);
	}
}

export default NavBar;