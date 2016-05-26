import React from "react";
import ReactDOM from "react-dom";
import ReactRouter from "react-router";
import firebase from "firebase";
import styles from "./styles.js";

class Person extends React.Component {
	constructor() {
		super();
	}

	render() {
		return (
			<div style={styles.boundedBox}>
				{this.props.name}
			</div>
			);
	}
}

class PeopleManager extends React.Component {
	constructor() {
		super();
		this.state = {
			people: []
		};
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
			console.log(o);
			personElems.push(<Person key={o.name} name={o.name} />)
		}
		return (
			<div>
				<PersonEntry />
				{ personElems }
			</div>
			);
	}
}

class PersonEntry extends React.Component {
	constructor() {
		super();
		this.state = { name: "" };
	}

	onSubmit(event) {
		event.preventDefault();
		var peoplePath = "people";
		var newKey = firebase.database().ref(peoplePath).push().key;
		var newPersonPath = peoplePath + "/" + newKey;
		var updates = {};
		updates[newPersonPath] = {
			name: this.state.name
		};
		firebase.database().ref().update(updates);
		this.setState({ name: "" });
	}

	handleNameChange(event) {
		this.setState({ name: event.target.value });
	}

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit.bind(this)}>
					<input
						type="text"
						value={this.state.name}
						onChange={this.handleNameChange.bind(this)} />
					<button type="submit">Create User</button>
				</form>
			</div>
			);
	}
}

export default PeopleManager;