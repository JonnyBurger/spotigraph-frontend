import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {isEqual} from 'lodash';
import styled from 'styled-components';
import Graph from './Graph';
import Title, {Subtitle} from './Title';
import X from './X';
import Recommendations from './Recommendations';

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
	margin-top: 100px;
`;

const Button = styled.div`
	font-size: 13px;
	border: 1px solid #666;
	padding: 4px 10px;
	border-radius: 2px;
	text-decoration: none;
	color: #666;
	&:hover {
		color: #222;
		border-color: #222;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
`;

class MatchPage extends Component {
	state = {result: null, loading: false};
	componentDidMount() {
		this.doFetch();
	}
	doFetch(props = this.props) {
		this.setState({
			loading: true
		});
		fetch('/api', {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify({
				one: props.match.params.one,
				two: props.match.params.two
			})
		})
			.then(response => response.json())
			.then(response => {
				this.setState({
					result: response.data,
					loading: false
				});
			})
			.catch(err => console.log(err));
	}
	componentWillReceiveProps(props) {
		if (!isEqual(props.match.params, this.props.match.params)) {
			this.doFetch(props);
		}
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
		const isSame = this.props.match.params.one === this.props.match.params.two;
		if (this.state.loading) {
			return 'Loading...';
		}
		if (!this.state.result || isSame) {
			return (
				<Container
					style={{
						flexDirection: 'column'
					}}
				>
					<Title>{isSame ? 'Wow, look at that.' : 'You win.'}</Title>
					<Subtitle>
						We could not find a connection between{' '}
						<strong>{this.props.match.params.one}</strong> and{' '}
						<strong>{this.props.match.params.two}</strong>. <br /> Do you want
						to try one of our suggestions?
						<div style={{margin: 'auto', maxWidth: 1000, marginTop: 40}}>
							<Recommendations />
						</div>
					</Subtitle>
				</Container>
			);
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
							<StyledLink to="/">
								<Button>Go back</Button>
							</StyledLink>
						</div>
						<div style={{alignSelf: 'center', flex: 1}}>
							<Title>
								{this.props.match.params.one} <X />{' '}
								{this.props.match.params.two}
							</Title>
							<Subtitle>{this.renderSubtitle()}</Subtitle>
						</div>
						<div>
							<StyledLink to="/">
								<Button>Tweet</Button>
							</StyledLink>
						</div>
					</TitleRow>
					<Graph result={this.state.result} />
				</div>
			</Container>
		);
	}
}

export default MatchPage;
