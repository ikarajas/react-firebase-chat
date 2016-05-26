import React from "react";
import ReactDOM from "react-dom";

import NavBar from "./NavBar.js";

class Main extends React.Component {
	render() {
		return (
			<div>
				<div class="jumbotron">
					<h1>Simple Chat</h1>
				</div>
				<div className="col-md-2">
					<NavBar />
				</div>
				<div className="col-md-10">
					<div>
						{this.props.children}
					</div>
				</div>
			</div>
			);
	}
}


export default Main;