import React from 'react';
import './App.css';
import MyNavbar from './components/Navbar/index.js';
//import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages';
import About from './components/Navbar/about'
import Upload from './components/Navbar/upload'
import Edit from './pages/edit'
import UploadSuccess from './pages/uploadSuccess';
import EditSuccess from './pages/editSuccess';
import DeleteSuccess from './pages/deleteSuccess';
import SignUp from './components/Navbar/signup'
import SignIn from './pages/signin';
import Contact from './components/Navbar/contact'
import GenericDateCard from './pages/dates/genericdatecard';
import DateSpecs from './pages/dates/datespecs';
import logo from './dateGen.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import BottomSlides from './components/BottomSlide/index.js';
import {initializeApp} from 'firebase/app';
import { firebaseConfig } from './assets/firebaseConfig';
import Homepage from './pages/homepage';


function App() {
  return (
  <div className="homepage">
    <Router> 
    <MyNavbar className="my-navbar"/>
    <Routes>
      <Route exact path='/' element={<SignIn />} />
      <Route path='/about' element={<About/>} />
      <Route path='/contact' element={<Contact/>} /> 
      <Route path='/upload' element={<Upload />} />
      <Route path='/edit' element={<Edit />} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/uploadSuccess' element ={<UploadSuccess />} />
      <Route path='/editSuccess' element={<EditSuccess />} />
      <Route path='/deleteSuccess' element={<DeleteSuccess />} />
      <Route path='/dates/oneonone' element={<GenericDateCard dateType={'oneonone'}/>} />
      <Route path='/dates/activities' element={<GenericDateCard dateType={'activity'}/>} />
      <Route path='/dates/fooddrink' element={<GenericDateCard dateType={'fooddrink'}/>} />
      <Route path='/dates/datespecs' element={<DateSpecs /> } />
      <Route path='/homepage' element={<Homepage />} />
    </Routes>
    </Router>
    <BottomSlides className="styled-slide" />
  </div>
  );
};

export default App;