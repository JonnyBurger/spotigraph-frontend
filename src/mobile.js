import {css} from 'styled-components';

const mobile = (...args) => css`
	@media (max-width: 800px) {
		${css(...args)};
	}
`;

export const makeMobile = width => {
	return (...args) => css`
		@media (max-width: ${width}px) {
			${css(...args)};
		}
	`;
};

export const desktop = (...args) => css`
	@media (min-width: 801px) {
		${css(...args)};
	}
`;

export default mobile;
