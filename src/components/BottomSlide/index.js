import React from "react";
import '../../App.css';
import logo from "../../dateGen.svg";
import dinner from "../images/dinner.png";
import rollerskate from "../images/rollerskating.png"
import movies from "../images/movie_theater.png"
import Carousel from "react-bootstrap/Carousel";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const BottomSlide = () => {
  return (
    <Carousel variant="dark" className="styled-carousel">
        <Carousel.Item interval={1000}>
					<img src={dinner} className="d-block w-100"/>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
					<img src={rollerskate} className="d-block w-100"/>
        </Carousel.Item>
        <Carousel.Item interval={1000}>
					<img src={movies} className="d-block w-100"/>
        </Carousel.Item>
    </Carousel>
  );
};

export default BottomSlide;
