// todo: look into navbar ... how it works... so you can convert to bootstrap
import React from 'react';
import './App.css';

// navbar shit
import MyNavbar from './components/Navbar/index.js';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages';
import About from './pages/about'
import Upload from './pages/upload'
import Admin from './pages/admin';
import UploadSuccess from './pages/uploadSuccess';
import SignUp from './pages/signup'
import Contact from './pages/contact'
import Activities from './pages/dates/activities'
import FoodDrink from './pages/dates/fooddrink'
import GenericDateCard from './pages/dates/genericdatecard';
import OneOnOne from './pages/dates/oneonone';
import DateSpecs from './pages/dates/datespecs';
import logo from './dateGen.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import BottomSlides from './components/BottomSlide/index.js';
import {foodDrinkData} from "./assets/foodDrinkData";
import {activityData} from "./assets/activityData";
import {oneOnOneData} from "./assets/oneOnOneData";

function App() {
  return (

  <div className="homepage">
    <Router> 
    <MyNavbar className="my-navbar"/>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} /> 
      <Route path='/upload' element={<Upload />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/uploadSuccess' element ={<UploadSuccess />} />
      <Route path='/dates/oneonone' element={<GenericDateCard dateType={'oneonone'}/>} />
      <Route path='/dates/activities' element={<GenericDateCard dateType={'activity'}/>} />
      <Route path='/dates/fooddrink' element={<GenericDateCard dateType={'fooddrink'}/>} />
      <Route path='/dates/datespecs' element={<DateSpecs /> } />
    </Routes>
    </Router>
    <BottomSlides className="styled-slide" />
  </div>
  );
};

export default App;

    /*
    <div className="App">
      <header className="App-header">
        <img src={logo} className="Website-logo" alt="dateGen logo" />
        <p>
          build your own date :)
        </p>
        <a
          className="App-link"
          href=""
          target="_blank"
          rel="noopener noreferrer"
        >
          Get Started
        </a>
      </header>
    </div>
  );
}
*/
