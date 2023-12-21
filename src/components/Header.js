import React from "react";
import { withAuth0 } from "@auth0/auth0-react";
import LoginButton from "./Login";
import { Navbar, Nav, Col, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import LogoutButton from "./Logout";
import './Header.css';

class Header extends React.Component {
    render() {
        const { isAuthenticated } = this.props.auth0;
        return (
            <>
                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                    <Navbar.Brand className='headNav'>Motiv8</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Col>
                        <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
                        </Col>
                        <Col>
                        <Nav.Link as={Link} to="/Profile" className="nav-link">My Profile</Nav.Link >
                        </Col>
                        <Col>
                        <Row>
                        {isAuthenticated ? <LogoutButton /> : <LoginButton />}
                        </Row>
                        </Col>
                    </Navbar.Collapse>
                </Navbar>
            </>
        )
    }
}


export default withAuth0(Header);