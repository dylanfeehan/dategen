
import axios from 'axios';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import dinner from '../../components/images/dinner.png'
import '../../App.css';
import picture from '../../assets/images/test_photo.jpg';
import {Link} from 'react-router-dom';

class GenericDateCard extends React.Component {
  constructor(props)   {
    super(props)
    this.state = {
      dates: []
    };
  }

  // THIS IS A MESS. JUST FIGURE THE FRICK OUT how to uhh ,,, get the frickin data
  componentDidMount() {
    fetch("http://127.0.0.1:5000/getdates/", {
      'methods': 'GET',
      headers: {
        'Content-Type': 'application/JSON'
      }
    })
    .then(resp=>resp.json())
    .then(data =>
      this.setState({dates: data}));
  };
  /*
  componentDidMount() {
    fetch("http://127.0.0.1:5000/getdates/", {
      'methods': 'GET', 
      headers: {
        'Content-Type': 'application/JSON',
      }
    })
    .then(resp=>resp.json())
    .then(resp=>console.log(resp))
    .then(resp=>this.setState(resp))
    .then(error=>console.log(error));
  };
  */


  render() {
    const {data} = this.props;
    let array = this.state
    console.log("this is the idiot")
    console.log(array.dates.length);
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