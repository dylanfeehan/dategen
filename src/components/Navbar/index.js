import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import HomeLogo from '../../homelogo';
import {Link} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../../App.css'

const MyNavbar = () => {
  return (
      <Navbar bg="primary" variant="dark" className="">
        <Container>
          <Nav className="d-flex justify-content-center align-items-center justify-content-center">
            <Navbar.Brand>
              <HomeLogo />
            </Navbar.Brand>
            <Nav.Link as={Link} to="/about" className="">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
            <Nav.Link as={Link} to="/blogs" className="nav-link">Blog</Nav.Link>

            <NavDropdown title="Other" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/sign-up">Sign Up</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/dylanfeehan/dategen" target="_blank">Source</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          </Container>
      </Navbar>
  );
};

export default MyNavbar; // replace this wiith ya own propreitary stuff my boi