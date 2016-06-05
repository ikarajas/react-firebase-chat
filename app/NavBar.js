import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "React-Bootstrap"
import PubSub from "pubsub-js"
import styles from "./styles.js";

class NavBar extends React.Component {
    constructor() {
        super();
        this.googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        this.state = {
            currentUser: null
        };

        PubSub.subscribe("SET_CURRENT_USER", function(message, data) {
            this.setState({
                currentUser: data
            });
        }.bind(this));
    }

    handleResetChat(event) {
        event.preventDefault();
        firebase.database().ref("chats/demoChat").set(null);
    }

    render() {
        let avatar = null;
        let cu = this.state.currentUser;
        if (cu === null) {
            avatar = (
                <div style={styles.navBarAvatar}>
                        Not logged in
                </div>);
        }
        else {
            avatar = (
                <div style={styles.navBarAvatar}>
                    <span style={{ paddingRight: "3.5em" }}>
                        <img style={styles.avatarImage} src={cu.photoUrl} />
                    </span>
                    <span>
                        { cu.displayName }
                    </span>
                </div>);
        }

        return (
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">Simple Chat</Link>
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        <NavItem eventKey={1} href="#" onClick={this.handleResetChat.bind(this)}>
                            Reset Chat
                        </NavItem>
                    </Nav>
                    <Nav pullRight={true}>
                        <NavItem>
                            <Link to="/edit-user-details">
                                {avatar}
                            </Link>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
            );
    }
}

export default NavBar;