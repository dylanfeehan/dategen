import react from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { Link } from 'react-router-dom';
import '../../App.css';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../assets/firebaseConfig'; 
// TODO:  add firebase config


function SignUp() {
  const app = initializeApp(firebaseConfig);
  console.log(app.name);

  // TODO: add firebase config

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  }


  const popover = (
    <Popover id="popover-basic" className="my-popover">
      <Popover.Header as="h3" style={{
        textAlign: 'center'
      }}>STOP</Popover.Header>
      <Popover.Body style={{
        textAlign: 'center'
      }}
        as="p">Sign up / sign in functionality coming soon. {isChecked ? "why'd you check the terms of service box there's no terms of service lol" : "Good job not clicking the terms of service box ;)"}</Popover.Body>
      <div className="special-link-container">
        <Link to="/">
          <Button variant="outline-dark">Back to Home</Button>
        </Link>
      </div>
    </Popover>
  );

  return (
    <div className="form-container">
      <Form>
        <Form.Group className="form-group-with-margin">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="John Doe" />
        </Form.Group>
        <Form.Group className="form-group-with-margin">
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="dohndoe@example.com" />
        </Form.Group>
        <Form.Group className="mb-3 form-group-with-margin" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
            type="checkbox" id="main-checkbox" label="Agree to terms of service" checked={isChecked}
            onChange={handleCheckboxChange}
          />
        </Form.Group>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Button variant="outline-dark">Sign Up</Button>
        </OverlayTrigger>
      </Form>
    </div>
  );
}

export default SignUp;