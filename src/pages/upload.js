import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {useEffect} from 'react'
import {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../App.css'
import APIService from '../api/APIService';

// well now it's going to be more generic...

function Upload() {
  let firstRender = true;
  let navigate = useNavigate();
  const location = useLocation();
  // on load, it should set... the thing to the thing...
  
  // super irresponsible of me to use let, but this allows me to reassign it to an object that i know to be equivalent!
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    id: null,
    details: "",
    site: "",
    reservations: "",
    notes: "",
    directions: "",
    request: 'Upload'
  });

  useEffect((formData) => {
      if(location.state != null) {
        const dateSpecs = location.state.data
        dateSpecs.request = location.state.request
        console.log('testies')
        setFormData({ ...formData, ...dateSpecs});
    /*formData.title = dateSpecs.title;
    formData.type = dateSpecs.type;
    formData.id = dateSpecs.id;
    formData.details = dateSpecs.details;
    formData.site = dateSpecs.site;
    formData.reservations = dateSpecs.reservations;
    formData.notes = dateSpecs.notes;
    formData.directions = dateSpecs.directions;
    formData.request = dateSpecs.request;
    rendered = true;
    */
  // reassign... no longer!
      }
  }, []); 

  

  const handleChange = (event) => {
    const { name, value } = event.target;
    //console.log(name)
    //console.log(value)
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify(formData));
    if(formData.request === "Edit") {
      console.log('you have requested an edit but this functionality is not provided yet by the backend');
      let result = APIService.UpdateDate(formData);
      if (result != null) {
      result.then(resp => console.log(resp))
      .then(error => console.log(error));
      }
      navigate('/uploadSuccess', {
        state: {
          action: 'Edit',
          data: formData,
        }
      });
    }
    else if (formData.request === "Upload") {
      APIService.UploadDate(formData)
        .then(resp => console.log(resp))
        .then(error => console.log(error))
      navigate('/uploadSuccess', {
        state: {
          action: 'Upload',
        }
      })
    }
    // now i can finally fucking redirect
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 p-2" controlId="formTitle">
          <Form.Label>Date Title</Form.Label>
          <Form.Control type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Girasole" />
        </Form.Group>

        <Form.Group className='p-2'>
          <Form.Label >Date Type</Form.Label>
          <Form.Select controlId="formType" aria-label="Default select example"
            name='type'
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="">Select Date Type</option>
            <option value="oneonone">One on one</option>
            <option value="activity">Activity</option>
            <option value="fooddrink">Food/Drink</option>
          </Form.Select>
        </Form.Group>


        <Form.Group className="mb-3 p-2" controlId="formDetails">
          <Form.Label>Date Details</Form.Label>
          <Form.Control type="text"
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Enjoy a fantastic dinner at Shadyside's premier italian restaurant." />
        </Form.Group>

        <Form.Group className="mb-3 p-2" controlId="formSite">
          <Form.Label>Date Website</Form.Label>
          <Form.Control type="text"
            name="site"
            value={formData.site}
            onChange={handleChange}
            placeholder="www.girasole.com" />
          <Form.Text className="text-muted">
            Leave empty if N/A
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3 p-2" controlId="formReservations">
          <Form.Label>Reservations / Prep Info</Form.Label>
          <Form.Control type="text"
            name='reservations'
            value={formData.reservations}
            onChange={handleChange}
            placeholder="No" />
        </Form.Group>

        <Form.Group className="mb-3 p-2" controlId="formNotes">
          <Form.Label>Notes</Form.Label>
          <Form.Control type="text"
            name='notes'
            value={formData.notes}
            onChange={handleChange}
            placeholder="park on potter and walk" />
        </Form.Group>

        <Form.Group className="mb-3 p-2" controlId="formDirections">
          <Form.Label>Directions</Form.Label>
          <Form.Control type="text"
            name="directions"
            value={formData.directions}
            onChange={handleChange}
            placeholder="https://www.google.com/maps/dir//girasole+pgh/@40.4497258,-79.9351429,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8834f210dfe82e2f:0xd21b7c032976c0f9!2m2!1d-79.9346787!2d40.451191" />
          <Form.Text className='text-muted' >
            Please provide directions from google maps, starting with an unspecified location
          </Form.Text>
        </Form.Group>
        <Button variant="dark" type="submit" style={{ display: 'block', margin: 'auto' }}>{formData.request} Date</Button>
      </Form>
    </div>
  );

}


export default (Upload);
/*
class Upload extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      type: "",
      details: "",
      site: "",
      reservations: "",
      notes: "",
      directions: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {

    const {name, value} = event.target;
    this.setState({[name]: value})
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(JSON.stringify(this.state))

    APIService.UploadDate(this.state).then(resp=>console.log(resp)).then(error=>console.log(error));
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group className="mb-3 p-2" controlId="formTitle">
            <Form.Label>Date Title</Form.Label>
            <Form.Control type="text" 
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            placeholder="Girasole" />
          </Form.Group>

          <Form.Group className='p-2'>
            <Form.Label >Date Type</Form.Label>
            <Form.Select controlId="formType" aria-label="Default select example"
              name='type' 
              value={this.state.type}
              onChange={this.handleChange}
              required
            >
            <option value="">Select Date Type</option>
            <option value="oneonone">One on one</option>
            <option value="activity">Activity</option>
            <option value="fooddrink">Food/Drink</option>
            </Form.Select>
          </Form.Group>


          <Form.Group className="mb-3 p-2" controlId="formDetails">
            <Form.Label>Date Details</Form.Label>
            <Form.Control type="text" 
            name="details"
            value={this.state.details}
            onChange={this.handleChange}
            placeholder="Enjoy a fantastic dinner at Shadyside's premier italian restaurant." />
          </Form.Group>

          <Form.Group className="mb-3 p-2" controlId="formSite">
            <Form.Label>Date Website</Form.Label>
            <Form.Control type="text" 
            name="site"
            value={this.state.site}
            onChange={this.handleChange}
            placeholder="www.girasole.com" />
            <Form.Text className="text-muted">
              Leave empty if N/A
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3 p-2" controlId="formReservations">
            <Form.Label>Reservations / Prep Info</Form.Label>
            <Form.Control type="text" 
            name='reservations'
            value={this.state.reservations}
            onChange={this.handleChange}
            placeholder="No" />
          </Form.Group>

          <Form.Group className="mb-3 p-2" controlId="formNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control type="text" 
            name='notes'
            value={this.state.notes}
            onChange={this.handleChange}
            placeholder="park on potter and walk" />
          </Form.Group>

          <Form.Group className="mb-3 p-2" controlId="formDirections">
            <Form.Label>Directions</Form.Label>
            <Form.Control type="text" 
            name="directions"
            value={this.state.directions}
            onChange={this.handleChange}
            placeholder="https://www.google.com/maps/dir//girasole+pgh/@40.4497258,-79.9351429,17z/data=!4m8!4m7!1m0!1m5!1m1!1s0x8834f210dfe82e2f:0xd21b7c032976c0f9!2m2!1d-79.9346787!2d40.451191" />
            <Form.Text className='text-muted' >
              Please provide directions from google maps, starting with an unspecified location
            </Form.Text>
          </Form.Group>
          <Button variant="dark" type="submit" style={{ display: 'block', margin: 'auto' }}>Upload Date</Button>
        </Form>
      </div>
    );
  }
}
*/

/*
class Upload extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: ' ' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    console.log(event)
  }

  
  }
}
export default Upload
*/