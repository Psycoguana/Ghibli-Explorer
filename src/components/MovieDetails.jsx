import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Card, Content, Columns, Heading, Section } from 'react-bulma-components';

import goodScoreImg from './../assets/imgs/tomatometer-good.svg';
import badScoreImg from './../assets/imgs/tomatometer-bad.svg';
import './../assets/css/MovieDetails.css';

export default function MovieDetails() {
	const id = useParams('id').id;
	const movies = JSON.parse(localStorage.getItem('movies'));
	const movie = movies.filter((movie) => movie.id === id)[0];

	const scores = {
		bad: badScoreImg,
		good: goodScoreImg,
	};

	function styleDescription(description) {
		const array = description.split('.');

		return array.map((sentence) => (sentence.length ? <p key={sentence}>{sentence}.</p> : ''));
	}

	return (
		<Columns id="details-container" className="column" centered vCentered="true">
			<Columns.Column size={7}>
				<Box>
					<Heading style={{ marginBottom: '0px' }}>
						{movie.title} ({movie.release_date})
					</Heading>

					<Heading subtitle>
						<strong>Original Title:</strong> {movie.original_title} - {movie.original_title_romanised}
					</Heading>
					<Columns centered vCentered="true">
						<Columns.Column size={4}>
							<div className="content">
								<img
									id="poster"
									src={movie.image}
									alt={`${movie.title} poster`}
									style={{ borderRadius: '10px' }}
								/>
							</div>
						</Columns.Column>

						<Columns.Column flex="true" size={4}>
							<Content>
								<Section>
									<strong>Rotten Tomato Score:</strong> {movie.rt_score}
									{'\u00a0\u00a0'}
									<img
										src={movie.rt_score >= 60 ? scores.good : scores.bad}
										alt={movie.rt_score >= 60 ? 'Good Score' : 'Bad Score'}
										className="score"
									/>
								</Section>

								<Card.Footer>
									<Card.Footer.Item>
										{<div className="description">{styleDescription(movie.description)}</div>}
									</Card.Footer.Item>
								</Card.Footer>
							</Content>
						</Columns.Column>
					</Columns>
				</Box>
			</Columns.Column>
		</Columns>
	);
}
