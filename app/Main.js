import React from "react";
import ReactDOM from "react-dom";

import NavBar from "./NavBar.js";
import PubSub from "pubsub-js"
import UserService from './UserService.js';

class Main extends React.Component {
    constructor() {
        super();
        this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        window.userService = new UserService();

        this.state = {
            waitingForUserData: true,
            currentUser: null
        };

        PubSub.subscribe("SET_CURRENT_USER", function(message, data) {
            this.setState({
                waitingForUserData: false,
                currentUser: data
            });
        }.bind(this));

        firebase.auth().onAuthStateChanged(user => {
            if (user === null) {
                this.setState({
                    waitingForUserData: false,
                });
            }
        });

    }

    handleThirdPartySignIn(e) {
        e.preventDefault();
        firebase.auth().signInWithRedirect(this.googleAuthProvider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            let token = result.credential.accessToken;
            // The signed-in user info.
            console.log(result.user);
            this.setState({currentUser: result.user});
        }).catch(function(error) {
            console.log("Oops, something went wrong with authentication.", error);
        });
    }

    render() {
        let body;
        if (this.state.waitingForUserData) {
            body = (
                    <div style={{textAlign: "middle", fontSize: "20pt", color: "gray"}}>
                        Loading...
                    </div>
                );
        }
        else if (this.state.currentUser === null) {
            return (
                <div className="home-container">
                    <p>
                        <a href="#" onClick={this.handleThirdPartySignIn.bind(this)}>Sign in with Google</a>
                    </p>
                </div>
                );
        }
        else {
            body = (
                    <div>
                        {this.props.children}
                    </div>
                );
        }

        return (
            <div>
                <div>
                    <NavBar />
                </div>
                <div className="col-md-12">
                    { body }
                </div>
            </div>
            );
    }
}


export default Main;