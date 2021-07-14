import React from 'react';
import Footer from './Footer';
import NavBar from './NavBar';
import Wrapper from './Wrapper';

const Layout = ({ children }) => {
	return (
		<>
			<NavBar></NavBar>
			<Wrapper>{children}</Wrapper>
			<Footer />
		</>
	);
};

export default Layout;
