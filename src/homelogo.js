import React, { useEffect, useState } from 'react';
import logo from './dateGen.svg';
import { Link } from 'react-router-dom';
import lightlogo from './images/lightdategenlogo.png'
import firebase_app from './assets/firebase_app';
import { getAuth } from 'firebase/auth';


const HomeLogo = () => {

	const [user, setUser] = useState(null);
	const [destination, setDestination] = useState("/");

	useEffect(() => {
		const auth = getAuth(firebase_app);
		auth.onAuthStateChanged((user) => {
			if (user) {
				setDestination("/homepage");
			}
		})
	}, []);
	return (
		<Link to={destination}>
			<img src={lightlogo} width="50" height="50" />
		</Link>
	);
};

export default HomeLogo;