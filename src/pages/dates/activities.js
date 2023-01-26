import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../../App.css';
import HomeLogo from '../../homelogo';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Activities = () => {
	return (
		<Card>
			<Card.Body>
				<Card.Title>Dinner</Card.Title>
				<Card.Text>Grab a bite to eat at a nice Pittsburgh restaurant</Card.Text>
			</Card.Body>
			<Button>View Restaurants</Button>
		</Card>
	);
};

export default Activities