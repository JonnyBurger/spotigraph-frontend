import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import styled, {keyframes} from 'styled-components';
import Side from './Side';
import Header from './Header';
import Recommendations from './Recommendations';
import mobile from './mobile';

const Site = styled.div`
	max-width: 1000px;
	margin: auto;
`;

const Container = styled.div`
	display: flex;
	max-width: 1000px;
	margin: auto;
	height: 600px;
	z-index: -1;
	${mobile`
		flex-direction: column;
	`};
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
	${mobile`
		margin-left: 10px;
		margin-right: 10px;
	`} ${props =>
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

const sponsorAnimation = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const SponsorInfo = styled.div`
	font-weight: bold;
	bottom: 0;
	font-size: 13px;
	animation: ${sponsorAnimation} 0.5s;
	color: rgba(0, 0, 0, 0.5);
	text-align: center;
	display: flex;
	align-items: center;
	justify-content: center;
	* {
		vertical-align: middle;
	}
	${mobile`
		display: block;
	`};
`;

const MobileDiv = styled.div`
	display: inline-block;
	width: 100px;
	${mobile`
		width: 100%;
	`};
`;

class App extends Component {
	state = {
		one: null,
		two: null
	};
	render() {
		const disabled = ![this.state.one, this.state.two].every(Boolean);
		return (
			<Fragment>
				<Site>
					<Header />
					<div
						style={{
							background: 'linear-gradient(white, white)',
							paddingBottom: 20
						}}
					>
						<Site>
							<Recommendations />
						</Site>
					</div>

					<Container>
						<Side
							selected={this.state.one}
							onChange={hit => this.setState({one: hit})}
						/>
						<Side
							selected={this.state.two}
							onChange={hit => this.setState({two: hit})}
							right
						/>
					</Container>
					<StyledLink
						to={
							disabled ? '' : `/${this.state.one.name}/${this.state.two.name}`
						}
					>
						<Button disabled={disabled}>Find connection</Button>
					</StyledLink>
					<br />
					<br />
					<SponsorInfo>
						Music data by
						<a
							href="https://developer.spotify.com/web-api/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								alt="Spotify"
								style={{height: 25, marginLeft: 11}}
								src={require('./spotify.png')}
							/>
						</a>
						<MobileDiv />
						Search by
						<a
							href="https://www.algolia.com/"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								alt="Algolia"
								style={{height: 25, marginLeft: 11}}
								src={require('./algolia-logo-light.png')}
							/>
						</a>
					</SponsorInfo>
					<div style={{height: 100}} />
				</Site>
			</Fragment>
		);
	}
}

export default App;
