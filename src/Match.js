import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Graph from './Graph';
import Title, {Subtitle} from './Title';
import X from './X';

const Container = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
	min-width: 100vw;
	min-height: 100vh;
`;

const TitleRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-bottom: 100px;
`;

class MatchPage extends Component {
	state = {result: null};
	componentDidMount() {
		fetch('http://localhost:7000', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				one: this.props.match.params.one,
				two: this.props.match.params.two
			})
		})
			.then(response => response.json())
			.then(response => {
				this.setState({
					result: response.data
				});
			})
			.catch(err => console.log(err));
	}
	renderSubtitle() {
		if (this.state.result.segments.length === 2) {
			return (
				<span>
					Both artists have collaborated with{' '}
					<strong>
						{this.state.result.segments[1].start.properties.title}
					</strong>.
				</span>
			);
		}
		if (this.state.result.segments.length === 1) {
			return (
				<span>
					They have directly collaborated on the song{' '}
					<strong>
						"{this.state.result.segments[0].relationship.properties.song}"
					</strong>.
				</span>
			);
		}
		return (
			<span>
				They are connected through a chain of{' '}
				{this.state.result.segments.length - 1} artists.
			</span>
		);
	}
	render() {
		if (!this.state.result) {
			return 'Loading...';
		}
		return (
			<Container>
				<div
					style={{
						display: 'block',
						flex: 1,
						maxWidth: 1000
					}}
				>
					<TitleRow>
						<div>
							<Link to="/">Go back</Link>
						</div>
						<div style={{alignSelf: 'center', flex: 1}}>
							<Title>
								{this.props.match.params.one} <X />{' '}
								{this.props.match.params.two}
							</Title>
							<Subtitle>{this.renderSubtitle()}</Subtitle>
						</div>
						<div>
							<Link to="/">Tweet</Link>
						</div>
					</TitleRow>
					<Graph result={this.state.result} />
				</div>
			</Container>
		);
	}
}

export default MatchPage;
