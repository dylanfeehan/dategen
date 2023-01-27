import React from 'react';
import me from "../assets/images/contact.png"
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import { MDBIcon } from 'mdb-react-ui-kit';
import '../App.css';


const Contact = () => {
  return (

    <div>
      <img src={me} alt="me" height="300" style={{margin: 'auto', marginTop: '1rem', display: 'block', borderRadius: '50%'}}/>
      <div className="contact-container">
        <i className="fas fa-envelope-square my-icon"></i>
        <h3>Email: dylanjfeehan@gmail.com</h3>
      </div>
      <div className="contact-container">
        <i className="fas fa-phone my-icon"></i>
        <h3>Phone: (607)222-2443</h3>
      </div>
      <div className="contact-container">
        <i className="fas fa-home my-icon"></i>
        <h3>Address: 5447 Potter Street</h3>
      </div>
    </div>
  );
};

export default Contact;