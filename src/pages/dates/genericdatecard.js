
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import dinner from '../../components/images/dinner.png'
import '../../App.css';
import picture from '../../assets/images/test_photo.jpg';
import {Link} from 'react-router-dom';

class GenericDateCard extends React.Component {
  render() {
    const {data} = this.props;
    return (
      <div>
        {data.map((card, index) => (
          <Card style={{width: '18rem'}} key={index} className="mx-auto datecard">
            <Card.Img variant="top" src={card.image} alt="picture"/>
            <Card.Body>
              <Card.Title>{card.title}</Card.Title>
              <Card.Text>{card.text}</Card.Text>
              <Link to="/dates/datespecs" state={{data: card}}>
                <Button variant="dark">View Details</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </div>
    );
  }
}
export default GenericDateCard;