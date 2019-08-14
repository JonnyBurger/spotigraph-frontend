import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import Title, {TitleRow} from './Title';
import mobile, {desktop} from './mobile';

const Container = styled.div`
	max-width: 650px;
	margin: auto;
`;

const QuestionTitle = styled.div`
	font-family: 'Playfair Display';
	font-weight: bold;
	margin-top: 20px;
`;

const QuestionParagraph = styled.p`
	font-family: 'Playfair Display';
	line-height: 1.7;
	a {
		color: inherit;
	}
`;

const Button = styled.div`
	font-size: 13px;
	border: 1px solid #444;
	padding: 4px 10px;
	border-radius: 2px;
	text-decoration: none;
	color: #444;
	margin-left: 4px;
	margin-right: 4px;
	&:hover {
		color: #222;
		border-color: #222;
	}
`;

const Cont = styled.div`
	margin: 14px;
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

export default () => {
	return (
		<Container>
			<TitleRow style={{color: 'black'}}>
				<div style={{paddingLeft: 14}}>
					<StyledLink to={'/'}>
						<Button>Back</Button>
					</StyledLink>
				</div>
				<div style={{flex: 1}}>
					<Title>About</Title>
				</div>
			</TitleRow>
			<Cont>
				<QuestionTitle>What is feature.fyi?</QuestionTitle>
				<QuestionParagraph>
					This site allows you to find the shortest connection between two
					artists based on their collaborations. For example, the shortest path
					between Lorde and JAY Z is the following:
					<br /> Lorde has collaborated with Disclosure (Magnets), who have
					collaborated with Mary J. Blige (F For You), who has collaborated with
					JAY Z (Can't Knock The Hustle).
				</QuestionParagraph>
				<QuestionTitle>How it works</QuestionTitle>
				<QuestionParagraph>
					The data lives in a graph database (Neo4j), which can compute those
					connections using a shortest-path algorithm.
				</QuestionParagraph>
				<QuestionParagraph>
					Data was extracted from the Spotify API by specifying a seed artist
					and then navigating to their collaborators. By filtering based on the
					popularity field returned by the Spotify API the dataset stays small
					and the size can be controlled by changing the threshold.
				</QuestionParagraph>
				<QuestionParagraph>
					For cost reason, the database currently only includes the top 25'000
					most popular artists on Spotify, which still generates a network of
					about 1.5 million links.
				</QuestionParagraph>
				<QuestionTitle>Credits</QuestionTitle>
				<QuestionParagraph>
					Made by Jonny Burger (<a href="https://Twitter.com/JNYBGR">@JNYBGR</a>
					)
				</QuestionParagraph>
				<QuestionParagraph>
					The inspiration for this project is from{' '}
					<a
						href="https://github.com/erabug/wikigraph"
						target="_blank"
						rel="noopener noreferrer"
					>
						Wikigraph
					</a>
					, which has also provided a tutorial on how to build such a thing.
					Also credits to to{' '}
					<a
						href="https://algolia.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						Algolia
					</a>{' '}
					and{' '}
					<a
						href="https://developer.spotify.com/web-api/"
						target="_blank"
						rel="noopener noreferrer"
					>
						Spotify
					</a>{' '}
					for their free APIs and{' '}
					<a
						target="_blank"
						rel="noopener noreferrer"
						href="https://codepen.io/chintuyadav/pen/NvxXmd"
					>
						{' '}
						Chintu Yadav Sara
					</a>{' '}
					for the background pattern on the startsite.
				</QuestionParagraph>
				<QuestionTitle>Open Source</QuestionTitle>
				<QuestionParagraph>
					<a
						href="https://github.com/JonnyBurger/spotigraph"
						target="_blank"
						rel="noopener noreferrer"
					>
						API on Github
					</a>
					<br />
					<a
						href="https://github.com/JonnyBurger/spotigraph-frontend"
						target="_blank"
						rel="noopener noreferrer"
					>
						Frontend on Github
					</a>
					<br />
				</QuestionParagraph>
			</Cont>
		</Container>
	);
};
