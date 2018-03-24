import React, {Fragment, Component} from 'react';
import styled, {keyframes} from 'styled-components';
import {tween} from 'popmotion';
import {MotionValue} from 'popmotion-react';

const TIME_PER_ITEM = 1500;

const Timeline = styled.div`
	display: flex;
	flex-direction: row;
	max-width: 1000px;
	margin: auto;
	align-items: center;
	flex: 1;
`;

const Song = styled.div`
	flex: 1;
	font-size: 14px;
	display: flex;
	flex-direction: column;
	align-items: center;
	font-weight: bold;
	margin: 3px;
	height: 60px;
	color: #222;
	justify-content: center;
	position: relative;
	text-align: center;
`;

const animation = keyframes`
    from {
        width: 0%;
    }
    25% {
        left: 0;
        width: 100%;
        right: auto;
    }
    75% {
        left: auto;
        width: 100%;
        right: 0;
    }
    to {
        width: 0%;
        right: 0;
        left: auto;
    }
`;

const SongAnimation = styled.div`
	background: gold;
	height: 100%;
	width: 0%;
	left: 0;
	z-index: -1;
	position: absolute;
	animation: ${animation} ${TIME_PER_ITEM / 1000 + 0.3}s
		${props => props.delay / 1000}s;
`;

const artistAnimation = keyframes`
    20% {
        background: gold;
        color: black;
    }
    50% {
        background: gold;
        color: black;
    }
    85% {
        background: black;
        color: white;
    }
    to {
        background: black;
        color: white;
        text-shadow: 0 0 2px black;
    }
`;

const Artist = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	font-family: 'Playfair Display';
	font-weight: bold;
	background: ${props => (props.first ? '#222' : 'gold')};
	color: ${props => (props.first ? 'white' : 'black')};
	margin: 3px;
	height: 200px;
	position: relative;
	animation: ${props => artistAnimation} ${props => props.time / 1000}s
		${props => props.delay / 1000}s;
	animation-fill-mode: forwards;
	text-align: center;
`;

const Cover = styled.img`
	height: 50px;
	width: 50px;
`;

const Padder = styled.div`
	flex: 0.5;
	background: transparent;
	height: 60px;
	margin: 3px;
`;

const BackgroundImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	position: absolute;
	mix-blend-mode: luminosity;
	filter: brightness(140%);
	z-index: 0;
`;

const Label = styled.div`
	position: absolute;
	z-index: 0;
`;

const removeBrackets = string => {
	return string.replace(/\(.*\)/g, '');
};

class Animated extends Component {
	constructor() {
		super();
		this.stateChangeHandlers = {
			on: ({value}) =>
				tween({
					from: 0,
					to: this.props.end || 1
				}).start(value)
		};
	}
	componentDidMount() {
		setTimeout(() => {
			this.setStateTo.on();
		}, this.props.delay);
	}
	render() {
		return (
			<MotionValue v={0} onStateChange={this.stateChangeHandlers}>
				{({v, setStateTo}) => {
					this.setStateTo = setStateTo;
					return React.cloneElement(this.props.children, {
						style: {opacity: v}
					});
				}}
			</MotionValue>
		);
	}
}

const AnimatedSong = props => {
	const {delay, ...otherProps} = props;
	return (
		<Animated delay={delay}>
			<Song {...otherProps}>
				<SongAnimation delay={delay} />
				<div>“{removeBrackets(props.song)}”</div>
			</Song>
		</Animated>
	);
};

const AnimatedArtist = props => {
	const {delay, artistsLength, last, first, ...otherProps} = props;
	const realDelay = delay + (last ? 0 : TIME_PER_ITEM) + (first ? -100 : 0);
	return (
		<Animated delay={delay}>
			<Artist time={2 * TIME_PER_ITEM} first={first} delay={realDelay}>
				{props.artist.image && props.artist.image !== 'undefined' ? (
					<Animated end={0.4} delay={realDelay + TIME_PER_ITEM}>
						<BackgroundImage src={props.artist.image} />
					</Animated>
				) : null}
				<Label>{props.artist.title}</Label>
			</Artist>
		</Animated>
	);
};

const Graph = props => {
	return (
		<div>
			<Timeline>
				<Padder />
				{props.result.segments.map((segment, i) => {
					if (i % 2 === 0) {
						return null;
					}
					return (
						<AnimatedSong
							delay={(1 + i) * TIME_PER_ITEM}
							song={segment.relationship.properties.song}
						/>
					);
				})}
				{props.result.segments.length % 2 === 1 ? <Padder /> : null}
			</Timeline>
			<Timeline>
				{props.result.segments.map((segment, i) => {
					return (
						<Fragment>
							<AnimatedArtist
								first={i === 0}
								artistsLength={props.result.segments.length}
								delay={i * TIME_PER_ITEM}
								artist={segment.start.properties}
							/>
							{i + 1 === props.result.segments.length ? (
								<AnimatedArtist
									delay={(i + 1) * TIME_PER_ITEM}
									last
									artistsLength={props.result.segments.length}
									artist={segment.end.properties}
								/>
							) : null}
						</Fragment>
					);
				})}
			</Timeline>
			<Timeline>
				{props.result.segments.map((segment, i) => {
					if (i % 2 === 1) {
						return null;
					}
					return (
						<AnimatedSong
							delay={(1 + i) * TIME_PER_ITEM}
							song={segment.relationship.properties.song}
						/>
					);
				})}
				{props.result.segments.length % 2 === 0 ? <Padder /> : null}
			</Timeline>
		</div>
	);
};

export default Graph;
