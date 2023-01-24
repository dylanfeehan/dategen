import React from 'react';
import './App.css';

// navbar shit
import Navbar from './components/Navbar/index.js';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages';
import About from './pages/about'
import Blogs from './pages/blogs'
import SignUp from './pages/signup'
import Contact from './pages/contact'

import logo from './dateGen.svg';

function App() {
  return (

    <Router> 
    <Navbar />
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} /> 
      <Route path='/blogs' element={<Blogs/>} />
      <Route path='/sign-up' element={<SignUp/>} />
    </Routes>
    </Router>
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
