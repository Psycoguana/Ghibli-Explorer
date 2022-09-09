import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Navbar as BNavbar, Image } from 'react-bulma-components';
import logo from './../assets/imgs/logo.svg';
import './../assets/css/Navbar.css';

export default function Navbar() {
	const [species, setSpecies] = useState([]);

	// onMount
	useEffect(() => {
		// Call the api only if the info is not already in the local storage.
		if (localStorage.getItem('species') === null) {
			axios.get('https://ghibliapi.herokuapp.com/species').then((response) => {
				localStorage.setItem('species', JSON.stringify(response.data));
				setSpecies(response.data);
			});
		} else {
			const localSpecies = JSON.parse(localStorage.getItem('species'));
			setSpecies(localSpecies);
		}
	}, []);

	function toggleActive(id) {
		const navbarMenu = document.getElementById(id);
		if (navbarMenu.classList.contains('is-active')) {
			navbarMenu.classList.remove('is-active');
		} else {
			navbarMenu.classList.add('is-active');
		}
	}

	return (
		<BNavbar>
			<BNavbar.Brand>
				<BNavbar.Item href="/">
					<Image src={logo} alt="Ghibli Logo" rounded></Image>
				</BNavbar.Item>

				<BNavbar.Burger
					onClick={() => {
						toggleActive('navMenu');
					}}
				></BNavbar.Burger>
			</BNavbar.Brand>

			<BNavbar.Menu id="navMenu">
				<BNavbar.Container className="navbar-start">
					<BNavbar.Item href="/">Home</BNavbar.Item>

					<BNavbar.Item id="speciesMenu" hoverable>
						<BNavbar.Link onClick={() => toggleActive('speciesMenu')}>Choose a Species</BNavbar.Link>

						<BNavbar.Dropdown>
							{species &&
								species.map((specie) => {
									return (
										<BNavbar.Item key={specie.id} href={`/specie/${specie.id}`}>
											{specie.name}
										</BNavbar.Item>
									);
								})}
						</BNavbar.Dropdown>
					</BNavbar.Item>
				</BNavbar.Container>

				<hr className="divider" />

				<BNavbar.Container align="right">
					<BNavbar.Item href="/about" arrowless>
						About
					</BNavbar.Item>
				</BNavbar.Container>
			</BNavbar.Menu>
		</BNavbar>
	);
}
