//
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import dinner from '../../components/images/dinner.png'
import '../../App.css';
import picture from '../../assets/images/test_photo.jpg';


class FoodDrink extends React.Component {
	render() {
		const { data } = this.props;
		return (
			<div>
				{data.map((card, index) => (
					<Card style={{width: '18rem'}} key={index} className="mx-auto datecard">
					 	<Card.Img variant="top" src={card.image} alt="picture"/>
						<Card.Body>
							<Card.Title>{card.title}</Card.Title>
							<Card.Text>{card.text}</Card.Text>
							<Button>View Details</Button>
						</Card.Body>
					</Card>
				))}
			</div>
		);
	}
}
export default FoodDrink;


/*class FoodDrink extends React.Component {
	render() {
		return 
	}
}


function foodDrinkCard({title, text}) {
	return (
		<Card>
			<Card.Body>
				<Card.Title>{title}</Card.Title>
				<Card.Text>{title}</Card.Text>
			</Card.Body>
		</Card>
	);
}
function foodDrinkList({foodDrinkData}) {
	return (
		<div>
			{foodDrinkData.map(({title, text}) => (
				<FoodDrinkCard key={0} title={title} text={text} />
			))}
		</div>
	);
}
export default FoodDrink {
	return (
		<FoodDrinkList foodDrinkData={foodDrinkData} />
	);
}*/
//const FoodDrink = () => {
/*console.log(foodDrinkData);
	return (
		/*<div>
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
	*/
//};

//export default FoodDrink;