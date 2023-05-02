import react from 'react';
import '../../src/App.css'
//import logo from '../../src/dateGen.svg';
import HomeLogo from '../../src/homelogo'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import sitename from '../images/trans_sitename-overlay.png'

const Home = () => {
  return (
    // this is basically the home page so.... lets add some shit
    <div>
      <div className="container">
        <img src={sitename} alt="lol" width={300} style={{
            marginTop: '2rem',
            marginBottom: '2rem',
        }}/>
        <Link to='/dates/activities'>
          <Button variant="outline-dark" className="primary-button">Activities</Button>
        </Link>
        <Link to='/dates/fooddrink'>
          <Button variant="outline-dark"className="primary-button">Food/Drink</Button>
        </Link>
        <Link to='/dates/oneonone'>
          <Button variant="outline-dark" className="primary-button">One-On-One</Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;