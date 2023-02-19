
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
    const {dateType} = this.props.dateType;
    let data = this.state['dates']
    let arr = []
    for(let i = 0; i < data.length; i++) {
      if(data[i] != null) {
        arr.push(data[i])
      }
    };
    console.log(arr);
    //console.log("printing state")
    //console.log(array)
    //console.log(array.length)
    //for(let i = 0; i < array.length; i++) {

    //}
    //console.log("this is the idiot")
    //console.log(array.dates.length);
    //let data = array
    //for(let i = 0; i < array.length; i++){
      //jconsole.log("banana")
      //console.log(data[i])
    //}
    return (
      <div>
        {arr.map((cardObj, index) => (
          <Card style={{width: '18rem'}} key={index} className="mx-auto datecard">
            {/*<Card.Img variant="top" src={card.image} alt="picture"/>*/}
            <Card.Body>
              <Card.Title>{cardObj.title}</Card.Title>
              <Card.Text>{cardObj.details}</Card.Text>
              <Link to="/dates/datespecs" state={{data: cardObj}}>
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