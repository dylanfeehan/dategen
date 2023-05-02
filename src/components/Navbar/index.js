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
      <Navbar sticky="top" bg="dark" variant="light">
        <Container>
          <Nav className="d-flex justify-content-center align-items-center justify-content-center">
            <Navbar.Brand>
              <HomeLogo />
            </Navbar.Brand>
            <Nav.Link as={Link} to="/about" className="">About</Nav.Link>
            <Nav.Link as={Link} to="/contact" className="nav-link">Contact</Nav.Link>
            <Nav.Link as={Link} to="/upload" className="nav-link">Upload</Nav.Link>

              <div className="narrow-boy">
            <NavDropdown title="Other" id="basic-nav-dropdown" align={{lg: 'start'}}>
              <NavDropdown.Item as={Link} to="/sign-up">Sign Up</NavDropdown.Item>
              <NavDropdown.Item href="https://github.com/dylanfeehan/dategen" target="_blank"><code>Source</code></NavDropdown.Item>
            </NavDropdown>
              </div>
          </Nav>
          </Container>
      </Navbar>
  );
};

export default MyNavbar; // replace this wiith ya own propreitary stuff my boi