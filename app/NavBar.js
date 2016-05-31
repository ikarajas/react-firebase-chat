import React from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router";
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from "React-Bootstrap"

class NavBar extends React.Component {
    render() {
    return (
        <div>
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Simple Chat</Link>
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} href="#">
                        <Link to="/">
                            Home
                        </Link>
                    </NavItem>
                    <NavItem eventKey={2} href="#">
                        <Link to="/people">
                            Users
                        </Link>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
        );
    }
}

export default NavBar;