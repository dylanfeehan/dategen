import React from "react";
import '../../App.css';
import logo from "../../dateGen.svg";
//import dinner from "../images/dinner.png";
//import rollerskate from "../images/rollerskating.png"
//import movies from "../images/movie_theater.png"
import bottom from "../images/dark_gray.png"
import Carousel from "react-bootstrap/Carousel";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BottomSlide = () => {
  return (
    <Carousel indicators={false} variant="light" className="styled-carousel fixed-bottom" style={{height: '6rem'}}>
        <Carousel.Item interval={2000}>
					<img src={bottom} className="d-block w-100"/>
          <Carousel.Caption>
            <h3>Browse</h3>
            <p>hand picked date options</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
					<img src={bottom} className="d-block w-100"/>
          <Carousel.Caption>
            <h3>Choose</h3>
            <p>your favorite ideas</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
					<img src={bottom} className="d-block w-100"/>
          <Carousel.Caption> 
            <h3>Enjoy</h3>
            <p>your date night :)</p>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  );
};

export default BottomSlide;
