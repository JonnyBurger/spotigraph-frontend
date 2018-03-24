import React from 'react';
import styled from 'styled-components';
import Title, {Subtitle} from './Title';

const Container = styled.div`
	max-width: 1000px;
	margin: auto;
`;

export default () => {
	return (
		<Container>
			<Title>Playfair Display</Title>
			<Subtitle>Exploring Music Connections</Subtitle>
		</Container>
	);
};
