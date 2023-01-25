import react from 'react';
import '../../src/App.css'
//import logo from '../../src/dateGen.svg';
import HomeLogo from '../../src/homelogo'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  return (
    // this is basically the home page so.... lets add some shit
    <div>
      <div className="container">
        <h2 className="centered message">Welcome! Please choose which part of the date you wish to plan:</h2>
        <Link to='/dates/activities'>
          <Button className="primary-button">Activities</Button>
        </Link>
        <Link to='/dates/fooddrink'>
          <Button className="primary-button">Food/Drink</Button>
        </Link>
        <Link to='/dates/oneonone'>
          <Button className="primary-button">One-On-One</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;