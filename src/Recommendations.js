import React, {Component} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {shuffle} from 'lodash';
import {readableColor} from 'polished';
import X from './X';

const recommendations = [
	['Nas', 'Digital Nas'],
	['Paul Simon', 'Jake Paul'],
	['Kanye West', 'Taylor Swift'],
	['Jimi Hendrix', 'Future'],
	['Ludwig van Beethoven', 'Zaytoven'],
	['Lorde', 'Prince'],
	['Willow', 'Jaden Smith'],
	['B.o.B', 'Bob Marley & The Wailers'],
	['2Pac', 'Backstreet Boys'],
	['Elvis Presley', 'Lil Pump'],
	['Ray Charles', 'RAYE'],
	['Migos', 'Los Amigos Invisibles'],
	['Marvin Gaye', 'Charlie Puth'],
	['The 1975', 'Future']
];

const Recommendation = styled.div`
	background: #222;
	text-transform: uppercase;
	font-size: 13px;
	font-weight: bold;
	display: inline-block;
	color: white;
	padding: 10px 20px;
	margin: 10px;
	cursor: pointer;
	border-width: 1px;
	border-style: solid;
`;

class Recommendations extends Component {
	shouldComponentUpdate() {
		return false;
	}
	render() {
		return (
			<div style={{textAlign: 'center'}}>
				{shuffle(recommendations).map((recom, i) => {
					const color = '#222222';
					const readable = readableColor(color);
					return (
						<Link key={recom.join()} to={`/${recom[0]}/${recom[1]}`}>
							<Recommendation
								style={{
									background: color,
									color: readable,
									borderColor: readable
								}}
							>
								{recom[0]}
								<X style={{color: readable, fontWeight: 'normal'}} />
								{recom[1]}
							</Recommendation>
						</Link>
					);
				})}
			</div>
		);
	}
}

export default Recommendations;
