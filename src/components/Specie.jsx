import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Content, Columns, Container, Section, Heading } from 'react-bulma-components';
import axios from 'axios';

export default function Specie() {
	const specieId = useParams('id').id;

	const [characters, setCharacters] = useState([]);
	const [specieType, setSpecieType] = useState([]);
	const [films, setFilms] = useState([]);

	function getAllCharacters() {
		let chars = [];
		axios.get(`https://ghibliapi.herokuapp.com/species/${specieId}`).then((response) => {
			// All people belonging to this species.
			const people = response.data.people;
			setSpecieType(response.data.name);

			people.forEach((person) => {
				axios.get(person).then((response) => {
					// Data about a single person belonging to this species.
					const data = response.data;

					data.films.forEach((film) => {
						axios.get(film).then((response) => {
							console.log(data);
							console.log(response.data);
							setFilms((oldState) => [...oldState, response.data]);
						});
					});

					chars.push(data);
				});
			});
		});
		return chars;
	}

	useEffect(() => {
		const controller = new AbortController();
		const rawCharacters = getAllCharacters(controller);
		setCharacters(rawCharacters);
	}, []);

	function findMovieById(id) {
		const movie = films.filter((film) => film.url === id);
		return <a href={movie.url}>{movie[0].title}</a>;
	}

	return (
		<Section style={{ backgroundColor: 'beige' }}>
			<Heading size={4}>{specieType}</Heading>
			<Columns centered="true" vCentered="true">
				{characters &&
					characters.map((person) => {
						return (
							<Columns.Column key={person.id}>
								<Container breakpoint="fluid" max="true">
									<Card key={person.id} style={{ width: 300, margin: 'auto' }}>
										<Heading>{person.name}</Heading>
										<Heading subtitle>
											<strong>Film: </strong> {films.length && findMovieById(person.films[0])}
										</Heading>

										<Content>
											<strong>⏳ Age:</strong> {person.age} <br />
											<strong>{person.gender === 'Male' ? '♂️' : '♀️'} Gender:</strong>{' '}
											{person.gender} <br />
											<strong>👁️ Eye Color:</strong> {person.eye_color} <br />
											<strong>💇 Hair Color:</strong> {person.hair_color} <br />
										</Content>
									</Card>
								</Container>
							</Columns.Column>
						);
					})}
			</Columns>
		</Section>
	);
}
