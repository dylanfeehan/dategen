// todo: look into navbar ... how it works... so you can convert to bootstrap
import React from 'react';
import './App.css';

// navbar shit
import MyNavbar from './components/Navbar/index.js';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages';
import About from './pages/about'
import Blogs from './pages/blogs'
import SignUp from './pages/signup'
import Contact from './pages/contact'
import Activities from './pages/dates/activities'
import FoodDrink from './pages/dates/fooddrink'
import OneOnOne from './pages/dates/oneonone';
import logo from './dateGen.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import BottomSlides from './components/BottomSlide/index.js';
import {foodDrinkData} from "./assets/foodDrinkData";

function App() {
  return (

  <div className="homepage">
    <Router> 
    <MyNavbar className="my-navbar"/>
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} /> 
      <Route path='/blogs' element={<Blogs/>} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/dates/oneonone' element={<OneOnOne/>} />
      <Route path='/dates/activities' element={<Activities/>} />
      <Route path='/dates/fooddrink' element={<FoodDrink data={foodDrinkData}/>} />
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