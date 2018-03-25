import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {isEqual} from 'lodash';
import styled from 'styled-components';
import Lottie from 'react-lottie';
import Helmet from 'react-helmet';
import Graph from './Graph';
import Title, {Subtitle, TitleRow} from './Title';
import X from './X';
import Recommendations from './Recommendations';
import * as animationData from './animation';
import mobile, {desktop} from './mobile';

const Container = styled.div`
	display: flex;
	flex: 1;
	justify-content: center;
	min-width: 100vw;
	min-height: 100vh;
	background: #222;
`;

const Button = styled.div`
	font-size: 13px;
	border: 1px solid #aaa;
	padding: 4px 10px;
	border-radius: 2px;
	text-decoration: none;
	color: #aaa;
	margin-left: 4px;
	margin-right: 4px;
	&:hover {
		color: #ccc;
		border-color: #ccc;
	}
`;

const StyledLink = styled(Link)`
	text-decoration: none;
	text-align: center;
	${props =>
		props.desktop
			? mobile`
		display: none;
	`
			: null} ${props =>
		props.mobile
			? desktop`
		display: none;
	`
			: null};
`;
class MatchPage extends Component {
	state = {result: null, loading: false, loadingReady: false};
	componentDidMount() {
		this.doFetch();
		setTimeout(() => {
			this.setState({loadingReady: true});
		}, 1000);
	}
	doFetch(props = this.props) {
		this.setState({
			loading: true
		});
		const domain = window.location.href.match(/feature.fyi/)
			? 'https://api.feature.fyi'
			: 'http://192.168.178.41:7000';
		fetch(domain, {
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
				They are connected through {this.state.result.segments.length - 1} other
				artists.
			</span>
		);
	}
	render() {
		const isSame = this.props.match.params.one === this.props.match.params.two;
		if (this.state.loading || !this.state.loadingReady) {
			return (
				<Container>
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							width: '100wv',
							height: '100vh'
						}}
					>
						<Lottie
							width={70}
							height={70}
							options={{
								loop: true,
								autoPlay: true,
								animationData
							}}
						/>
					</div>
				</Container>
			);
		}
		if (!this.state.result || isSame) {
			return (
				<Container style={{justifyContent: 'center', alignItems: 'center'}}>
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
								<Title>{isSame ? 'Wow, look at that.' : 'You win.'}</Title>
								<Subtitle>
									We could not find a connection between{' '}
									<strong>{this.props.match.params.one}</strong> and{' '}
									<strong>{this.props.match.params.two}</strong>.{' '}
									{isSame ? 'Head explode.' : null} <br /> Do you want to try
									one of our suggestions?
								</Subtitle>
							</div>
						</TitleRow>
						<div style={{margin: 'auto', maxWidth: 1000, textAlign: 'center'}}>
							<Recommendations />
						</div>
					</div>
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
					<Helmet>
						<title>
							{this.props.match.params.one} × {this.props.match.params.two}
						</title>
					</Helmet>

					<TitleRow>
						<div>
							<StyledLink to="/" desktop>
								<Button>Search another</Button>
							</StyledLink>
						</div>
						<div style={{alignSelf: 'center', flex: 1}}>
							<Title>
								{this.props.match.params.one} <X />{' '}
								{this.props.match.params.two}
							</Title>
							<Subtitle>{this.renderSubtitle()}</Subtitle>
						</div>
						<div style={{flexDirection: 'row', display: 'flex'}}>
							<StyledLink to="/" mobile>
								<Button>Search another</Button>
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
