import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {lighten, invert} from 'polished';
import X from './X';

const recommendations = [
	['Nas', 'Digital Nas'],
	['Paul Simon', 'Jake Paul'],
	['Kanye West', 'Taylor Swift'],
	['Jimi Hendrix', 'Future'],
	['Kirko Bangz', 'Kurt Cobain'],
	['Wolfgang Amadeus Mozart', 'Skrillex'],
	['Lorde', 'JAY Z']
];

const Recommendation = styled.div`
	background: #222;
	display: inline-block;
	color: white;
	padding: 10px 20px;
	margin: 10px;
	cursor: pointer;
`;

const Recommendations = props => {
	return (
		<div>
			{recommendations.map((recom, i) => {
				return (
					<Link key={recom.join()} to={`/${recom[0]}/${recom[1]}`}>
						<Recommendation
							style={{
								background: lighten(0.05 * i, '#222222')
							}}
						>
							{recom[0]}
							<X style={{color: invert(lighten(0.05 * i, '#222222'))}} />
							{recom[1]}
						</Recommendation>
					</Link>
				);
			})}
		</div>
	);
};

export default Recommendations;
