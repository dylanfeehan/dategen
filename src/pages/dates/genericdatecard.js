
import { Modal } from 'react-bootstrap';
import React, { useCallback, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../App.css';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import { ThreeDotsVertical } from 'react-bootstrap-icons'
import APIService from '../../api/APIService';
const url_prefix = process.env.REACT_APP_API_URL_PREFIX;

const GenericDateCard = (props) => {
  const [dates, setDates] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('called');
    let dateType = props.dateType;
    //let api_url = `https://api.dategen.fun/getdates/${dateType}/`;
    const api_url = url_prefix +`getdates/${dateType}/`;
    console.log('api url: ');
    console.log(api_url);
    //let api_url = `/api/getdates/${dateType}/`
    fetch(api_url, {
      method: 'GET',
      headers: {
        'Content-Type': "application/json"
      },
    }).then(resp => resp.json())
    .then(data => setDates(data));
  }, []);

  const arr = dates.filter((date) => date != null);

  const handleDeleteClick = useCallback(() => {
    setShowConfirmation(true);
  }, []);

  const handleClose = () => setShowConfirmation(false);

  function handleDelete(cardObj) {
    // what to send in
    const response = APIService.DeleteDate(cardObj.id);
    console.log("called delete, heres obj id");
    console.log(cardObj.id);

    setShowConfirmation(false);
    navigate("/deleteSuccess");
  };

  return (
    <div>
      {arr.map((cardObj, index) => (
        <Card style={{ width: '18rem' }} key={index} className="mx-auto datecard">
          {/*<Card.Img variant="top" src={card.image} alt="picture"/>*/}
          <Card.Header>
            <Card.Body>
              <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'flex-start' }}>
                <Card.Title>{cardObj.title}</Card.Title>
                <Dropdown>
                  <Dropdown.Toggle
                    id="dropdown-toggle"
                    title={<ThreeDotsVertical />}
                    variant="dark"
                    style={{ alignSelf: 'flex-start', marginTop: '-2rem', marginRight: '-2rem' }}
                  >
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant='dark' style={{}}>
                    <Dropdown.Item as={Link} to="/edit" state={{ request: "Edit", data: cardObj }}>Edit</Dropdown.Item>
                    {/*<Dropdown.Item as={Link} to="/upload" state={{ request: "Edit", data: cardObj }}>Edit</Dropdown.Item> */}

                    <Dropdown.Item onClick={handleDeleteClick}>Delete</Dropdown.Item>
                    <Modal show={showConfirmation} onHide={handleClose}>
                      {console.log("wtf")}
                      <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        Are you sure you want to delete this date?
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="dark" onClick={handleClose}>Cancel</Button>
                        <Button variant="danger" onClick={() => handleDelete(cardObj)}>Delete</Button>
                      </Modal.Footer>
                    </Modal>
                    {/* modal here */}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <Card.Text style={{ paddingTop: '1rem' }}>{cardObj.details}</Card.Text>
              <Link to="/dates/datespecs" state={{ data: cardObj }}>
                <Button variant="dark">View Details</Button>
              </Link>
            </Card.Body>
          </Card.Header>

        </Card>
      ))}
    </div>
  );
};

export default GenericDateCard;