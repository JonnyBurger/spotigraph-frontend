import React, {Component, Fragment} from 'react';
import {InstantSearch, SearchBox, Configure} from 'react-instantsearch/dom';
import {uniqBy} from 'lodash';
import {connectStateResults} from 'react-instantsearch/connectors';
import styled, {keyframes} from 'styled-components';
import Title from './Title';
import {desktop} from './mobile';
import Pattern from './Pattern';

const Wrapper = styled.div`
	flex: 1;
	background: radial-gradient(circle at bottom left, #222, #444);
	margin: 10px;
	position: relative;
	overflow: hidden;
`;

const slideUp = keyframes`
	from {
		transform: translateY(0);
	} to {
		transform: translateY(-40px);
	}
`;

const Field = styled(SearchBox)`
	input[type='search'] {
		background: white;
		border: 0;
		padding: 15px 20px;
		font-size: 24px;
		outline: none;
		margin-top: 0;
		border-radius: 0;
		-webkit-appearance: none;
		transition: transform 0.3s, padding-left 0.3s, padding-right 0.3s;
		&:focus {
			padding-left: 30px;
			padding-right: 60px;
			${desktop`			
				transform: translateY(-40px);
			`};
		}
	}
`;

const CustomHits = styled.div`
	${desktop`	
		transform: translateY(-40px);
		animation: ${slideUp} 0.3s;
	`} max-height: 200px;
	overflow: auto;
	overflow-x: hidden;
	background: white;
`;

const Hit = styled.div`
	background: ${props => (props.selected ? 'rgba(0, 0, 0, 0.1)' : 'white')};
	padding: 8px 16px;
	cursor: default;
	&:hover {
		background: rgba(0, 0, 0, 0.1);
	}
`;

const MyResults = props => {
	const mergedHits = uniqBy(
		[...props.searchResults.hits, {name: props.searchResults.query}],
		r => r.name
	).filter(r => r.name);
	return (
		<CustomHits>
			{mergedHits.map((hit, i) => {
				return (
					<Hit
						key={hit.name}
						className={i === props.selected ? 'selected-result' : null}
						selected={i === props.selected}
						onMouseDown={() => {
							props.onSelect(hit);
						}}
						onClick={() => {
							props.onSelect(hit);
						}}
					>
						{hit.name}
					</Hit>
				);
			})}
		</CustomHits>
	);
};

const Results = connectStateResults(MyResults);

const Background = styled.img`
	object-fit: cover;
	position: absolute;
	background: radial-gradient(center, #444, #222);
	width: 100%;
	height: 100%;
	mix-blend-mode: luminosity;
	opacity: 0.4;
	filter: brightness(140%);
	z-index: 0;
`;

const Container = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Change = styled.div`
	text-transform: uppercase;
	text-align: center;
	color: white;
	font-weight: bold;
	font-size: 13px;
	margin-top: -10px;
	cursor: pointer;
	&:hover {
		opacity: 0.7;
	}
`;

class Side extends Component {
	state = {
		elemSelected: 0
	};
	minMaxIndex(index) {
		if (index < 0) {
			return 0;
		}
		return index;
	}
	render() {
		return (
			<Fragment>
				<Wrapper>
					{this.props.selected ? (
						<Background src={this.props.selected.image} />
					) : (
						<Pattern />
					)}
					<Container>
						{this.props.selected ? (
							<div>
								<Title
									style={{
										color: 'white'
									}}
								>
									{this.props.selected.name}
								</Title>
								<Change
									onClick={() => {
										this.props.onChange(null);
									}}
								>
									Change
								</Change>
							</div>
						) : (
							<InstantSearch
								apiKey="0f441c37356455cf6362861d2c443a2b"
								appId="UGSK5PN9B3"
								indexName="artist"
							>
								<Configure hitsPerPage={20} />
								<Field
									submit={null}
									translations={{
										placeholder: this.props.right
											? 'Enter another one'
											: 'Enter an artist'
									}}
									onBlur={() => {
										this.setState({focused: false});
									}}
									onFocus={() => {
										this.setState({focused: true});
									}}
									onKeyDown={e => {
										if (e.key === 'ArrowUp') {
											this.setState({
												elemSelected: this.minMaxIndex(
													this.state.elemSelected - 1
												)
											});
										} else if (e.key === 'ArrowDown') {
											this.setState({
												elemSelected: this.minMaxIndex(
													this.state.elemSelected + 1
												)
											});
										} else if (e.key === 'Enter') {
											const elem = document.querySelector('.selected-result');
											if (elem) {
												elem.click();
											}
										} else {
											this.setState({
												elemSelected: 0
											});
										}
									}}
									value={this.props.text}
								/>
								{this.state.focused ? (
									<Results
										selected={this.state.elemSelected}
										onSelect={hit => {
											this.props.onChange(hit);
											this.setState({focused: false});
										}}
									/>
								) : null}
							</InstantSearch>
						)}
					</Container>
				</Wrapper>
			</Fragment>
		);
	}
}

export default Side;
