import { Modal } from 'react-bootstrap';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Feed = (props) => {
    console.log("User's current token: " + props.jwt);
    const [posts, setPosts] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function getPosts() {
            console.log("Getting posts for this token: " + props.jwt);
            let posts = await APIService.GetUserPosts(props.jwt);
            setPosts(posts);
            console.log("got posts: " + posts);
            console.log(posts[0]);
            console.log(posts[0].getJSON());
        };
        getPosts();
    }, []);

    const arr = posts.filter((post) => post !== null)

    // test to see if this is necessary
    const handleDeleteClick = useCallback(() => {
        setShowConfirmation(true);
    }, []);

    const handleClose = () => setShowConfirmation(false);

    async function handleDelete(postSpecs) {
        handleClose();
        console.log('deleting this: ' + postSpecs);
        const response = await APIService.DeletePost(postSpecs.id, props.jwt);
        setShowConfirmation(false);
        navigate("/deleteSuccess");
    };

    return (
        <div>
            {arr.map((postSpecs, index) => (
                <Card style={{ width: '18rem' }} key={index} className="mx-auto datecard">
                    <Card.Header>
                        <Card.Body>
                            <div style={{ display: 'flex', justifyContent: "space-between", alignItems: 'flex-start' }}>
                                <Card.Title>{postSpecs.title}</Card.Title>
                                <Dropdown>
                                    <Dropdown.Toggle
                                        id="dropdown-toggle"
                                        title={<ThreeDotsVertical />}
                                        variant="dark"
                                        style={{ alignSelf: 'flex-start', marginTop: '-2rem', marginRight: '-2rem' }}
                                    >
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu variant='dark' style={{}}>
                                        {console.log("sending to edit")}
                                        {console.log(postSpecs)}
                                        <Dropdown.Item as={Link} to="/edit" state={{ request: "Edit", postSpecs: postSpecs, jwt: props.jwt}}>Edit</Dropdown.Item>
                                        <Dropdown.Item onClick={handleDeleteClick}>Delete</Dropdown.Item>
                                        <Modal show={showConfirmation} onHide={handleClose}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Confirm Delete</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                Are you sure you want to delete this date?
                                            </Modal.Body>
                                            <Modal.Footer>
                                                <Button variant="dark" onClick={handleClose}>Cancel</Button>
                                                <Button variant="danger" onClick={() => handleDelete(postSpecs)}>Delete</Button>
                                            </Modal.Footer>
                                        </Modal>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>

                            <Card.Text style={{ paddingTop: '1rem' }}>{postSpecs.details}</Card.Text>
                            <Link to="/dates/datespecs" state={{ data: postSpecs }}>
                                <Button variant="dark">View Details</Button>
                            </Link>
                        </Card.Body>
                    </Card.Header>

                </Card>
            ))}
        </div>
    );
};
export default Feed;