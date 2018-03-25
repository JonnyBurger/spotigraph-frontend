import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import mobile, {desktop} from './mobile';
import Title, {Subtitle, TitleRow} from './Title';
import X from './X';

const Container = styled.div`
	max-width: 1000px;
	margin: auto;
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
			<div
				style={{
					display: 'block',
					flex: 1,
					maxWidth: 1000
				}}
			>
				<TitleRow style={{color: 'black', marginTop: 50, marginBottom: 50}}>
					<div style={{flex: 1}}>
						<Title>
							<span style={{marginRight: 1}}>feature </span>
							<X
								style={{
									position: 'absolute',
									fontSize: 20,
									color: 'black',
									fontWeight: 'bold',
									marginLeft: 0,
									marginRight: 4,
									marginTop: 20
								}}
							/>{' '}
							<span style={{marginLeft: 20}}>fyi</span>
						</Title>
						<Subtitle style={{margin: 20, marginBottom: 40}}>
							Music artists are incredibly connected by featuring each other.{' '}
							<br /> Enter any two artists and see how they connect to each
							other.
						</Subtitle>
					</div>
					<div>
						<StyledLink to="/info">
							<Button>Info</Button>
						</StyledLink>
					</div>
				</TitleRow>
			</div>
		</Container>
	);
};
