import React from 'react';
import logo from './dateGen.svg';
import { Link } from 'react-router-dom';

const HomeLogo = () => {
	return (
		<Link to="/">
			<img src={logo}  />
		</Link>
	);
};

export default HomeLogo;