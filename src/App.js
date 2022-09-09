import './assets/css/App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import { Footer } from 'react-bulma-components';

import MovieDetails from './components/MovieDetails';
import Specie from './components/Specie';
import About from './components/About';

import 'bulma/css/bulma.min.css';

function App() {
	return (
		<div className="App">
			<Navbar />
			{
				<Routes>
					<Route exact path="/" element={<Home />}></Route>
					<Route exact path="/about" element={<About />}></Route>
					<Route exact path="/:id" element={<MovieDetails />}></Route>
					<Route exact path="/specie/:id" element={<Specie />}></Route>
				</Routes>
			}
			<Footer className="column is-narrow">Made with ❤️ by Nico</Footer>
		</div>
	);
}

export default App;
