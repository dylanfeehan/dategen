import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import dinner from '../../components/images/dinner.png'
import '../../App.css';

const FoodDrink = () => {
	return (
		<div>
		<Card style={{width: '18rem'}} className="mx-auto datecard">
			<Card.Img variant="top" src={dinner} />
			<Card.Body>
				<Card.Title>Dinner</Card.Title>
				<Card.Text>Grab a bite to eat at a nice Pittsburgh restaurant</Card.Text>
			</Card.Body>
			<Button>View Restaurants</Button>
		</Card>
		<Card style={{width: '18rem'}} className="mx-auto datecard">
			<Card.Img variant="top" src={dinner} />
			<Card.Body>
				<Card.Title>Dinner</Card.Title>
				<Card.Text>Grab a bite to eat at a nice Pittsburgh restaurant</Card.Text>
			</Card.Body>
			<Button>View Restaurants</Button>
		</Card>
		<Card style={{width: '18rem'}} className="mx-auto datecard">
			<Card.Img variant="top" src={dinner} />
			<Card.Body>
				<Card.Title>Dinner</Card.Title>
				<Card.Text>Grab a bite to eat at a nice Pittsburgh restaurant</Card.Text>
			</Card.Body>
			<Button>View Restaurants</Button>
		</Card>
		</div>
	);
};

export default FoodDrink;