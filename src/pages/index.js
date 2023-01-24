import react from 'react';
import '../../src/App.css'
//import logo from '../../src/dateGen.svg';
import HomeLogo from '../../src/homelogo'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = () => {
  return (
    // this is basically the home page so.... lets add some shit
    <div>
      <div className="container">
        <h2 className="centered message">Welcome! page under construction</h2>
        <Link to='/dates/activities'>
          <Button class="centered-button">Activities</Button>
        </Link>
        <Link to='/dates/fooddrink'>
          <Button class="centered-button">Food/Drink</Button>
        </Link>
        <Link to='/dates/oneonone'>
          <Button class="centered-button">One-On-One</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;