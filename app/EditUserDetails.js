import React from "react";
import ReactDOM from "react-dom";
import ReactRouter from "react-router";
import { Link } from "react-router";
import firebase from "firebase";
import { FormGroup, ControlLabel, FormControl, Panel, ButtonToolbar, Button } from "React-Bootstrap"
import styles from "./styles.js";

class EditUserDetails extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: window.userService.currentUser.displayName
        };
    }

    getValidationState() {
        return null;
    }

    handleChange(event) {
        this.setState({
            displayName: event.target.value
        });
    }

    handleUpdate() {
        // Hack...
        window.userService.currentUser.displayName = this.state.displayName;
        firebase.database()
            .ref("users/" + window.userService.currentUser.key)
            .set(window.userService.currentUser);
        this.context.router.push({ pathname: "/" });
    }

    render() {
        return (
            <div>
                <Panel header="Edit user details" style={{ width: "70%" }}>
                <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}>
                        <ControlLabel>Display Name</ControlLabel>
                        <FormControl
                            type="text"
                            value={this.state.displayName}
                            placeholder="Enter text"
                            onChange={this.handleChange.bind(this)} />
                        <FormControl.Feedback />
                    </FormGroup>
                    <FormGroup>
                        <ButtonToolbar>
                            <Button bsStyle="primary" onClick={this.handleUpdate.bind(this)}>Update</Button>
                            <Button>
                                <Link to="/">Cancel</Link>
                            </Button>
                        </ButtonToolbar>
                    </FormGroup>
                </form>
                </Panel>
            </div>
            );
    }
}


EditUserDetails.contextTypes = {
    router: function() { return React.PropTypes.func.isRequired; }
};


export default EditUserDetails;