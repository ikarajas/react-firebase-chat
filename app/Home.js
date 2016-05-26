import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import firebase from "firebase";
import styles from "./styles.js";


class PersonReadOnly extends React.Component {
	handleClick(e) {
		window.currentName = this.props.name;
		console.log(window.currentName);
		this.props.onPersonSelect();
	}

	render() {
		return (
			<li>
				<a href="#" onClick={this.handleClick.bind(this)}>
					{this.props.name}
				</a>
			</li>
			);
	}
}

class PersonList extends React.Component {
	constructor() {
		super();
		this.state = { people: [] };
	}

	componentWillMount() {
		var self = this;

		firebase.database().ref("people").on("value", function(snapshot) {
			self.setState({ people: snapshot.val() });
		});

	}

	render() {
		let personElems = [];
		for (let key in this.state.people) {
			let o = this.state.people[key];
			personElems.push(<PersonReadOnly key={o.name} name={o.name} onPersonSelect={this.props.onPersonSelect} />);
		}
		return (
			<ul>
				{ personElems }
			</ul>
			);
	}
}

class Home extends React.Component {
	handlePersonSelect() {
		this.forceUpdate();
	}

	handleEnterChat(event) {
		event.preventDefault();
		this.context.router.push({
			pathname: "/chat",
			query: {
				name: window.currentName
			}
		});
	}

	handleChangeIdentity() {
		window.currentName = undefined;
		this.forceUpdate();
	}

	render() {
		if (typeof window.currentName === "undefined") {
			return (
				<div className="home-container">
					<p>
						Choose your chat identity...
					</p>
					<PersonList onPersonSelect={this.handlePersonSelect.bind(this)} />
				</div>
				);
		}
		else {
			return (
				<div>
					<p>You will be chatting as: {window.currentName}</p>
					<p>
						You can now&nbsp;
						<a href="#" onClick={this.handleEnterChat.bind(this)}>Enter Chat</a>, or&nbsp;
						<a href="#" onClick={this.handleChangeIdentity.bind(this)}>Change user</a>.
					</p>
				</div>
				);
		}
	}
}

Home.contextTypes = {
	router: React.PropTypes.object.isRequired
}

export default Home;