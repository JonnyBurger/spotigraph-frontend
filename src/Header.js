import React from 'react';
import styled from 'styled-components';
import Title, {Subtitle} from './Title';

const Container = styled.div`
	max-width: 1000px;
	margin: auto;
	padding-top: 40px;
`;

const Description = styled.div`
	font-family: 'Playfair Display';
	font-size: 14px;
	text-align: center;
	max-width: 600px;
	margin: auto;
`;

export default () => {
	return (
		<Container>
			<Title>Find music connections</Title>
			<Subtitle>
				Music artists are incredibly connected by featuring each other. <br />{' '}
				Enter two artists and see how they connect to each other.
			</Subtitle>
		</Container>
	);
};
