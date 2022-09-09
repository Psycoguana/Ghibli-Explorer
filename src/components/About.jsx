import React from 'react';
import { Box, Content, Columns, Heading } from 'react-bulma-components';
import './../assets/css/About.css';

function ListItem({ title, description, link, imageUrl }) {
	return (
		<div>
			<a href={link}>
				<Content className="list-item">
					<Columns size={6} centered vCentered breakpoint="tablet">
						<Columns.Column>
							<img className="is-rounded" src={imageUrl} alt="" />
						</Columns.Column>
						<Columns.Column>
							<h1>{title}</h1>
							<Columns.Column>
								<p>{description}</p>
							</Columns.Column>
						</Columns.Column>

						<hr className="list-divider" />
					</Columns>
				</Content>
			</a>
		</div>
	);
}

export default function About() {
	return (
		<Columns id="container" className="column" centered vCentered>
			<Columns.Column size={5} style={{ marginTop: '10px' }}>
				<Box>
					<Heading>Hello, I'm Nico 👋</Heading>
					<hr className="list-divider-header list-divider" />I made this website to learn how to develop and
					deploy a website using React. {'\u00a0'}
					Here are the tools I used :)
					<div className="list">
						<ListItem
							title="React"
							description="A JavaScript library for building user interfaces"
							link="https://www.reactjs.org"
							imageUrl="https://ionicframework.com/docs/icons/logo-react-icon.png"
						></ListItem>

						<ListItem
							title="LESS"
							description="Backwards-compatible language extension for CSS"
							link="https://lesscss.org/"
							imageUrl="https://seeklogo.com/images/L/less-logo-AAE582C286-seeklogo.com.png"
						></ListItem>

						<ListItem
							title="Studio Ghibli API"
							description="This API catalogs things found in the worlds of Ghibli"
							link="https://ghibliapi.herokuapp.com/"
							imageUrl="https://ghibliapi.herokuapp.com/images/logo.svg"
						></ListItem>

						<ListItem
							title="Bulma"
							description="Provides frontend components to build responsive web interfaces"
							link="https://bulma.io/"
							imageUrl="https://cdn.worldvectorlogo.com/logos/bulma.svg"
						></ListItem>

						<ListItem
							title="Bulma Components"
							description="React components for Bulma"
							link="https://github.com/couds/react-bulma-components"
							imageUrl="https://raw.githubusercontent.com/couds/react-bulma-components/master/static/img.png"
						></ListItem>
					</div>
				</Box>
			</Columns.Column>
		</Columns>
	);
}
