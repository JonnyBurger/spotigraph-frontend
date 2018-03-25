import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Side from './Side';
import Header from './Header';
import Recommendations from './Recommendations';

const Site = styled.div`
	max-width: 1000px;
	margin: auto;
`;

const Container = styled.div`
	display: flex;
	max-width: 1000px;
	margin: auto;
	height: 60vh;
	z-index: -1;
`;

const Button = styled.div`
	padding: 20px 30px;
	background: #222;
	max-width: 980px;
	display: block;
	margin: auto;
	text-align: center;
	font-family: 'Playfair Display';
	font-weight: bold;
	color: white;
	font-size: 20px;
	margin-top: 10px;
	${props =>
		props.disabled
			? `	
			opacity: 0.7;
			cursor: auto;
		`
			: null};
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	color: white;
	cursor: pointer;
`;

class App extends Component {
	state = {
		one: null,
		two: null
	};
	render() {
		const disabled = ![this.state.one, this.state.two].every(Boolean);
		return (
			<Site>
				<Header />
				<Container>
					<Side
						selected={this.state.one}
						onChange={hit => this.setState({one: hit})}
					/>
					<Side
						selected={this.state.two}
						onChange={hit => this.setState({two: hit})}
					/>
				</Container>
				<StyledLink
					to={disabled ? '' : `/${this.state.one.name}/${this.state.two.name}`}
				>
					<Button disabled={disabled}>Find connection</Button>
				</StyledLink>
				<br />
				<br />
				<div style={{textAlign: 'center', fontFamily: 'Playfair Display'}}>
					Don't feel inspired? Try one of these:
				</div>
				<Recommendations />
			</Site>
		);
	}
}

export default App;
