import React from "react";
import ReactDOM from "react-dom";

import NavBar from "./NavBar.js";

class Main extends React.Component {
	render() {
		return (
			<div>
				<div>
					<NavBar />
				</div>
				<div className="col-md-12">
					<div>
						{this.props.children}
					</div>
				</div>
			</div>
			);
	}
}


export default Main;