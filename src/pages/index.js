import react from 'react';
import '../../src/App.css'
import logo from '../../src/dateGen.svg';
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const Home = () => {
  return (
    // this is basically the home page so.... lets add some shit
    <div>
      <div className="container">
        <img src={logo} className="Website-Logo" alt="dateGen logo" /> {/* how to define this as an onblock logo? */}
        <h2 className="centered message">Welcome! page under construction</h2>
        <Link to='/about'>
          <Button variant="dark">Activities</Button>
        </Link>
        <Button>Food/Drink</Button>
        <Button>One-On-One</Button>
      </div>
    </div>
  );
};

export default Home;