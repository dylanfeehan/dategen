import React from 'react';
import logo from './dateGen.svg';
import { Link } from 'react-router-dom';
import lightlogo from './images/lightdategenlogo.png'

const HomeLogo = () => {
	return (
		<Link to="/">
			<img src={lightlogo} width="50" height="50"/>
		</Link>
	);
};

export default HomeLogo;