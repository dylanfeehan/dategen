import React from 'react';
import './App.css';
import MyNavbar from './components/Navbar/index.js';
import { HashRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages';
import About from './components/Navbar/about'
import Upload from './components/Navbar/upload'
import Edit from './pages/edit'
import Admin from './components/Navbar/admin';
import UploadSuccess from './pages/uploadSuccess';
import EditSuccess from './pages/editSuccess';
import DeleteSuccess from './pages/deleteSuccess';
import SignUp from './components/Navbar/signup'
import Contact from './components/Navbar/contact'
import GenericDateCard from './pages/dates/genericdatecard';
import DateSpecs from './pages/dates/datespecs';
import logo from './dateGen.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import BottomSlides from './components/BottomSlide/index.js';

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
      <Route path='/edit' element={<Edit />} />
      <Route path='/admin' element={<Admin />} />
      <Route path='/sign-up' element={<SignUp/>} />
      <Route path='/uploadSuccess' element ={<UploadSuccess />} />
      <Route path='/editSuccess' element={<EditSuccess />} />
      <Route path='/deleteSuccess' element={<DeleteSuccess />} />
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