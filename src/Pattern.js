import React from 'react';

export default () => {
	return (
		<div className="container">
			<div className="Pattern">
				<div className="horizantal">
					{new Array(100).fill(true).map((a, i) => {
						return <div key={a + i} className={`stripe stripe-${i + 1}`} />;
					})}
				</div>
				<div className="vertical">
					{new Array(100).fill(true).map((a, i) => {
						return <div key={a + i} className={`stripe stripe-${i + 1}`} />;
					})}
				</div>
			</div>
		</div>
	);
};
