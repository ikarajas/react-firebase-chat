import React from "react";
import ReactDOM from "react-dom";
import ReactRouter from "react-router";
import firebase from "firebase";
import styles from "./styles.js";

class ChatContainer extends React.Component {
    constructor() {
        super();
        this.chatName = "demoChat";
    }

    handleResetChat(event) {
        event.preventDefault();
        firebase.database().ref("chats/demoChat").set(null);
    }

    render() {
        return (
            <div>
                <div style={styles.resetChat}>
                    <p className="text-right">
                        <a href="#" onClick={this.handleResetChat.bind(this)}>Reset Chat</a>
                    </p>
                </div>
                <div>
                    <Conversation chatName={this.chatName} />
                </div>
                <div>
                    <ChatEntry currentPerson={this.props.location.query.name} chatName={this.chatName} />
                </div>
            </div>
            );
    }
}


ChatContainer.contextTypes = {
    router: function() { return React.PropTypes.func.isRequired; }
};

class Conversation extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "demoChat",
            chatItems: []
        };
        this.handleButtonClick = this.handleButtonClick.bind(this);
    }
    
    componentWillMount() {
        var self = this;

        firebase.database().ref("chats/" + this.state.name).on("value", function(snapshot) {
            self.setState({ chatItems: snapshot.val() });
        });
    }
    
    handleButtonClick() {
        var self = this;
    }
    
    render() {
        let chatElems = [];
        for (let key in this.state.chatItems) {
            let o = this.state.chatItems[key];
            chatElems.push(<ChatItem key={o.timeStamp} chatItemObj={o} />);
        }

        return (
            <div style={styles.conversationContainer}>
                { chatElems }
            </div>
        )
    }
}

class ChatItem extends React.Component {
    render() {
        return (
            <div style={styles.chatItem}>
                <strong>{this.props.chatItemObj.name}:</strong>&nbsp;
                <span>{this.props.chatItemObj.text}</span>
            </div>
        )
    }
}

class ChatEntry extends React.Component {
    constructor() {
        super();
        this.state = { text: "" };
    }

    onSubmit(event) {
        event.preventDefault();
        var conversationPath = "chats/" + this.props.chatName;
        var newKey = firebase.database().ref(conversationPath).push().key;
        console.log(this.props.router);
        var newChatItemPath = conversationPath + "/" + newKey;
        var updates = {};
        updates[newChatItemPath] = {
            name: this.props.currentPerson,
            timeStamp: ((new Date()).getTime()),
            text: this.state.text
        };
        firebase.database().ref().update(updates);
        this.setState({ text: "" });
    }

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }

    render() {
        return (
            <div style={styles.chatEntry}>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input
                        style={styles.chatInput}
                        type="text"
                        value={this.state.text}
                        onChange={this.handleTextChange.bind(this)} />
                    <button type="submit">Submit</button>
                </form>
            </div>
            );
    }
}


export default ChatContainer;