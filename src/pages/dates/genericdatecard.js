
import React, { useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../../App.css';
import { Link } from 'react-router-dom';
import { useState } from 'react'

const GenericDateCard = (props) => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    console.log('called');
    let dateType = props.dateType
    console.log(dateType)
    let api_url = `http://127.0.0.1:5000/getdates/${dateType}/`
    console.log(api_url)
    fetch(api_url, {
      method: ['GET'],
      headers: {
        'Content-Type': 'application/JSON',
      },
    })
      .then(resp => resp.json())
      .then(data => setDates(data))
  }, []);

  const arr = dates.filter((date) => date != null);

  return (
    <div>
      {arr.map((cardObj, index) => (
        <Card style={{ width: '18rem' }} key={index} className="mx-auto datecard">
          {/*<Card.Img variant="top" src={card.image} alt="picture"/>*/}
          <Card.Body>
            <Card.Title>{cardObj.title}</Card.Title>
            <Card.Text>{cardObj.details}</Card.Text>
            <Link to="/dates/datespecs" state={{ data: cardObj }}>
              <Button variant="dark">View Details</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default GenericDateCard;

/*
class GenericDateCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      dates: []
    };
  }

  componentDidMount() {
    console.log("called")
    let dateType = this.props.dateType
    let api_url = 'http://127.0.0.1:5000/getdates/' + dateType + '/'
    fetch(api_url, {
      //fetch('http://127.0.0.1:5000/getdates/', {
      'methods': 'GET',
      headers: {
        'Content-Type': 'application/JSON'
      }
    })
      .then(resp => resp.json())
      .then(data =>
        this.setState({ dates: data }));
  };

  render() {
    const { dateType } = this.props.dateType;
    let data = this.state['dates']
    let arr = []
    for (let i = 0; i < data.length; i++) {
      if (data[i] != null) {
        arr.push(data[i])
      }
    };

    return (
      <div>
        {arr.map((cardObj, index) => (
          <Card style={{ width: '18rem' }} key={index} className="mx-auto datecard">
            <Card.Body>
              <Card.Title>{cardObj.title}</Card.Title>
              <Card.Text>{cardObj.details}</Card.Text>
              <Link to="/dates/datespecs" state={{ data: cardObj }}>
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
*/