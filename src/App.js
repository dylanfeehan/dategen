import React from 'react';
import './App.css';

// navbar shit
import Navbar from './components/Navbar/index.js';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages';
import About from './pages/about'
import Blogs from './pages/blogs'
import SignUp from './pages/signup'
import Contact from './pages/contact'

import logo from './dateGen.svg';

function App() {
  return (

    <Router> 
    {// HashRouter 
    }
    <Navbar />
    <Routes>
      <Route exact path='/dategen' element={<Home />} />
      <Route path='/dategen#about' element={<About/>} />
      <Route path='/dategen#contact' element={<Contact/>} /> 
      <Route path='/dategen#blogs' element={<Blogs/>} />
      <Route path='/dategen#sign-up' element={<SignUp/>} />
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
