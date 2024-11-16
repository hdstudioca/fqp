import React from 'react';

const Header = () => {
	return (
		<header style={styles.header}>
			<h1 style={styles.title}>My App</h1>
		</header>
	);
};

const styles = {
	header: {
		backgroundColor: '#282c34',
		padding: '20px',
		textAlign: 'center',
	},
	title: {
		color: 'white',
		fontSize: '24px',
	},
};

export default Header;