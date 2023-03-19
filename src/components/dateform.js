import React from 'react'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Form } from 'react-bootstrap'
import PostSpecs from '../assets/PostSpecs';

const DateForm = (props) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState(
        props.postSpecs != null ? props.postSpecs : PostSpecs.fromObject({
            title: "",
            type: "",
            details: "",
            site: "",
            preparation: "",
            notes: "",
            location: "",
            id: null,
        }));

    const handleChange = (event) => {
        const { name, value } = event.target;
        // this is probably causing problems!
        console.log("Form data before edit: " + formData);
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
        console.log("Form data after edit: " + formData);
        console.log("after edit with JSON: " + formData.title);
        console.log("TYPE: " + typeof formData);
    };

    // handleSbubmit
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting this: ");
        console.log(formData);
        props.handleSubmit(PostSpecs.fromObject(formData));
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 p-2" controlid="formTitle">
                    <Form.Label>Date Title</Form.Label>
                    <Form.Control type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Girasole" />
                </Form.Group>

                <Form.Group className='p-2'>
                    <Form.Label >Date Type</Form.Label>
                    <Form.Select controlid="formType" aria-label="Default select example"
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


                <Form.Group className="mb-3 p-2" controlid="formDetails">
                    <Form.Label>Date Details</Form.Label>
                    <Form.Control type="text"
                        name="details"
                        value={formData.details}
                        onChange={handleChange}
                        placeholder="Enjoy a fantastic dinner at Shadyside's premier italian restaurant." />
                </Form.Group>

                <Form.Group className="mb-3 p-2" controlid="formSite">
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

                <Form.Group className="mb-3 p-2" controlid="formReservations">
                    <Form.Label>Reservations / Prep Info</Form.Label>
                    <Form.Control type="text"
                        name='reservations'
                        value={formData.reservations}
                        onChange={handleChange}
                        placeholder="No" />
                </Form.Group>

                <Form.Group className="mb-3 p-2" controlid="formNotes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control type="text"
                        name='notes'
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="park on potter and walk" />
                </Form.Group>

                <Form.Group className="mb-3 p-2" controlid="formDirections">
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
                <Button variant="dark" type="submit" style={{ display: 'block', margin: 'auto' }}>{props.action} Date</Button>
            </Form>
        </div>
    )
}

export default DateForm;