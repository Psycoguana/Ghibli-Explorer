import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Columns, Form, Section } from 'react-bulma-components';

import './../assets/css/Home.css';

export default function Home() {
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);

	// onMount
	useEffect(() => {
		if (localStorage.getItem('movies') === null) {
			axios.get('https://ghibliapi.herokuapp.com/films').then((response) => {
				setMovies(response.data);
				setFilteredMovies(response.data);
				localStorage.setItem('movies', JSON.stringify(response.data));
			});
		} else {
			const localMovies = JSON.parse(localStorage.getItem('movies'));
			setMovies(localMovies);
			setFilteredMovies(localMovies);
		}
	}, []);

	function filterBySearch(value) {
		let matchingMovies = [];

		movies.forEach((movie) => {
			if (movie.title.toLowerCase().includes(value.toLowerCase())) {
				matchingMovies.push(movie);
			}
		});

		setFilteredMovies(matchingMovies);
	}

	return (
		<div className="home">
			<h1 className="title is-1 is-family-primary	">Explore Ghibli Movies!</h1>

			<Form.Field id="search">
				<Form.Input
					type="text"
					placeholder="Search by Title"
					onChange={(e) => filterBySearch(e.target.value)}
				></Form.Input>
			</Form.Field>

			<Section>
				<Columns centered="true" vCentered="true" gap={8}>
					{filteredMovies &&
						filteredMovies.map((movie) => {
							return (
								<Columns.Column key={movie.id} size="one-quarter">
									<Link to={`/${movie.id}`}>
										<img src={movie.image} alt={`${movie.title} poster`} className="posterImage" />
									</Link>
								</Columns.Column>
							);
						})}
				</Columns>
			</Section>
		</div>
	);
}
