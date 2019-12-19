import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Create from './components/Create';
import CharList from './components/CharList';

class App extends React.Component {
	state = {
		chars: []
	}

	componentDidMount() {
		axios.get('http://localhost:5000/api/chars')
		.then(response => {
			this.setState({
				chars: response.data
			});
		})
		.catch(error => {
			console.error(`Error fetching data: ${error}`);
		});
	};

	onCharCreated = character => {
		const newChars = [...this.state.chars, character];

		this.setState({
			chars: newChars
		});
	};

	render () {
		let { chars } = this.state;
		return( 
			<Router>
				<div className="App">
					<header className="App-header">
						<h1>Tabletop RPG Character Creator</h1>
						<nav>
							<ul>
								<li>
									<Link to="/">Home</Link>
								</li>
								<li>
									<Link to ="/create">Create Character</Link>
								</li>
							</ul>
						</nav>
					</header>
					<main>
						<Route exact path="/">
							<React.Fragment>
								<CharList chars={chars} />
							</React.Fragment>
						</Route>
						<Switch>
							<Route path="/create">
								<Create onCharCreated={this.onCharCreated}/>
							</Route>
						</Switch>
					</main>
				</div>
			</Router>
		);
	}
}




export default App;
