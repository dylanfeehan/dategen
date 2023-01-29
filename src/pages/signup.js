/*import react from 'react';
import {useState} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import '../App.css';





const popover = (
  <Popover id="popover-basic" className="my-popover">
    <Popover.Header as="h3">STOP</Popover.Header>
    <Popover.Body as="p">Do you really think I implemented sign up functionality? You're literally the only person using this. I like you so you're already signed up. BTW if you didn't check the box then i'm probably sad.</Popover.Body>
  </Popover>
);


const SignUp = () => {
  return (
    <div className="form-container" style={{marginTop: '1rem'}}>
       <Form>
        <Form.Group className="form-group-with-margin">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="email" placeholder="Jen Something" />
        </Form.Group>
       <Form.Group className="form-group-with-margin">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" />
       </Form.Group>
        <Form.Group className="mb-3 form-group-with-margin" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check
          type="checkbox" id="main-checkbox" label="Cuddles Later"
          />
        </Form.Group>
        <OverlayTrigger trigger="click" placement="right" overlay={popover}>
          <Button variant="outline-dark">Sign Up</Button>
        </OverlayTrigger>
      </Form>
    </div>
  );
};

export default SignUp;
*/
import react from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import {Link} from 'react-router-dom';
import '../App.css';


function SignUp() {
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
      as="p">Do you really think I implemented sign up functionality? You're the only person using this lol. {isChecked ? "btw, thanks for checking the cuddle box" : "BTW, you didn't think i'd notice that you didn't check the cuddle box? you're so cruel lol"}</Popover.Body>
    <div className="special-link-container">
    <Link to="/">
      <Button variant="outline-dark">Back to Home</Button>
    </Link>
    </div>
  </Popover>
);

  return (
    <div className = "form-container">
    <Form>
      <Form.Group className="form-group-with-margin">
        <Form.Label>Full Name</Form.Label>
        <Form.Control type="text" placeholder="Jen Something" />
      </Form.Group>
      <Form.Group className="form-group-with-margin">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" placeholder="Enter Email" />
      </Form.Group>
      <Form.Group className="mb-3 form-group-with-margin" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox" id="main-checkbox" label="Cuddles Later" checked={isChecked}
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