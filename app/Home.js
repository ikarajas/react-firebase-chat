import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import firebase from "firebase";
import styles from "./styles.js";
import ChatContainer from "./ChatContainer.js";
import PubSub from "pubsub-js";

class Home extends React.Component {
    constructor() {
        super();
    }


    render() {
        return (
            <ChatContainer />
            );
    }
}

export default Home;