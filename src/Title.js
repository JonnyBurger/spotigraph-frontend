import styled from 'styled-components';
import mobile from './mobile';

const Title = styled.h1`
	text-align: center;
	font-family: 'Playfair Display';
	font-weight: 900;
`;

export const Subtitle = styled.div`
	text-align: center;
	font-family: 'Playfair Display';
	margin-top: -15px;
	margin-bottom: 15px;
	line-height: 1.7;
`;

export const TitleRow = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin-top: 100px;
	color: white;
	${mobile`
		flex-direction: column;
	`};
`;

export default Title;
