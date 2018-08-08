import React, {Fragment, Component} from 'react';
import styled, {keyframes} from 'styled-components';
import {tween} from 'popmotion';
import {MotionValue} from 'popmotion-react';
import scrollIntoView from 'scroll-into-view';
import mobile, {desktop} from './mobile';

const TIME_PER_ITEM = 1500;
const START_DELAY = 1000;

const Timeline = styled.div`
	display: flex;
	flex-direction: row;
	max-width: 1000px;
	margin: auto;
	align-items: center;
	flex: 1;
	${mobile`
		flex-direction: column;
	`};
`;

const songColorAnimation = keyframes`
    from {
		color: white;
    }
    25% {
		color: black;
    }
    75% {
		color: black;
    }
    to {
		color: white;
    }
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
	color: white;
	justify-content: center;
	position: relative;
	text-align: center;
	font-family: 'Playfair Display';
	border: 3px solid rgba(255, 255, 255, 0.1);
	animation: ${songColorAnimation} ${TIME_PER_ITEM / 1000 + 0.3}s
		${props => props.delay / 1000}s;
	${mobile`
		width: calc(100% - 20px);
		border-width: 0px;
	`};
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
	${mobile`
		width: calc(100% - 20px);
	`};
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
	opacity: 0.4;
	object-fit: cover;
	position: absolute;
	mix-blend-mode: luminosity;
	filter: brightness(140%);
	-webkit-filter: brightness(140%);
	z-index: 0;
`;

const DesktopTimeline = Timeline.extend`
	${mobile`
		display: none;
	`};
`;

const Label = styled.div`
	position: absolute;
	z-index: 0;
`;

const MobilePadding = styled.div`
	height: 150px;
	${desktop`
		display: none;
	`};
`;

const Cover = styled.img`
	height: 40px;
	width: 40px;
	margin-right: 7px;
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

class AnimatedSong extends Component {
	componentDidMount() {
		if (this.props.scroll) {
			this.timeout = setTimeout(() => {
				scrollIntoView(this.elem);
			}, this.props.delay);
		}
	}
	componentWillUnmount() {
		if (this.props.scroll) {
			clearTimeout(this.timeout);
		}
	}
	render() {
		const {delay, className} = this.props;
		return (
			<Animated delay={delay} className={className}>
				<Song {...this.props} innerRef={ref => (this.elem = ref)}>
					<SongAnimation delay={delay} />
					<div
						style={{
							position: 'absolute',
							display: 'flex',
							flexDirection: 'row',
							justifyContent: 'center',
							alignItems: 'center'
						}}
					>
						<Cover src={this.props.cover} />
						“{removeBrackets(this.props.song).trim()}”
					</div>
				</Song>
			</Animated>
		);
	}
}

const AnimatedSongMobile = styled(AnimatedSong).attrs({
	scroll: true
})`
	${desktop`
		display: none;
	`};
`;

class AnimatedArtist extends Component {
	render() {
		const {delay, last, first} = this.props;
		const realDelay = delay + (last ? 0 : TIME_PER_ITEM) + (first ? -100 : 0);
		return (
			<Animated delay={delay}>
				<Artist time={2 * TIME_PER_ITEM} first={first} delay={realDelay}>
					{this.props.artist.image &&
					this.props.artist.image !== 'undefined' ? (
						<BackgroundImage src={this.props.artist.image} />
					) : null}
					<Label>{this.props.artist.title}</Label>
				</Artist>
			</Animated>
		);
	}
}

const Graph = props => {
	return (
		<div>
			<DesktopTimeline>
				<Padder />
				{props.result.segments.map((segment, i) => {
					if (i % 2 === 0) {
						return null;
					}
					return (
						<AnimatedSong
							delay={(1 + i) * TIME_PER_ITEM + START_DELAY}
							song={segment.relationship.properties.song}
							preview={segment.relationship.properties.preview}
							cover={segment.relationship.properties.cover}
						/>
					);
				})}
				{props.result.segments.length % 2 === 1 ? <Padder /> : null}
			</DesktopTimeline>
			<Timeline>
				{props.result.segments.map((segment, i) => {
					return (
						<Fragment>
							<AnimatedArtist
								first={i === 0}
								artistsLength={props.result.segments.length}
								delay={i * TIME_PER_ITEM + START_DELAY}
								artist={segment.start.properties}
							/>
							<AnimatedSongMobile
								delay={(1 + i) * TIME_PER_ITEM + START_DELAY}
								song={segment.relationship.properties.song}
								preview={segment.relationship.properties.preview}
								cover={segment.relationship.properties.cover}
							/>
							{i + 1 === props.result.segments.length ? (
								<AnimatedArtist
									delay={(i + 1) * TIME_PER_ITEM + START_DELAY}
									last
									artistsLength={props.result.segments.length}
									artist={segment.end.properties}
								/>
							) : null}
						</Fragment>
					);
				})}
			</Timeline>
			<DesktopTimeline>
				{props.result.segments.map((segment, i) => {
					if (i % 2 === 1) {
						return null;
					}
					return (
						<AnimatedSong
							delay={(1 + i) * TIME_PER_ITEM + START_DELAY}
							song={segment.relationship.properties.song}
							preview={segment.relationship.properties.preview}
							cover={segment.relationship.properties.cover}
						/>
					);
				})}
				{props.result.segments.length % 2 === 0 ? <Padder /> : null}
			</DesktopTimeline>
			<MobilePadding />
		</div>
	);
};

export default Graph;
