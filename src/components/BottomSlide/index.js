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
    <Carousel  controls={false} indicators={false} variant="light" className="styled-carousel fixed-bottom" style={{height: '6rem'}}>
        <Carousel.Item interval={2000}>
					<img src={bottom} className="d-block w-100"/>
          <Carousel.Caption>
            <h3>Browse</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
					<img src={bottom} className="d-block w-100"/>
          <Carousel.Caption>
            <h3>Laugh</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
					<img src={bottom} className="d-block w-100"/>
          <Carousel.Caption> 
            <h3>Date</h3>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  );
};

export default BottomSlide;
