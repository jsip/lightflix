import { Box, Flex, Image, Link, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from '../../styles/NavBar.module.css';
import Search from './Search';
import SCard from './SCard';

const NavBar = () => {
	const router = useRouter();
	let path = router.pathname.split('/');

	const [query, setQuery] = useState();

	const queryHandler = (e) => {
		if (e.target.value.trim() !== '') {
			setQuery(e.target.value);
		} else {
			setQuery(null);
		}
	};

	const clickHandler = () => setQuery('');

	const nav = (
		<Flex className={styles.header}>
			<NextLink href='/' rel='noopener noreferrer'>
				<Link className={styles.logoCont}>
					<Image src='/logo.png' alt='logo' className={styles.logo} />
					<div className={styles.logoText}>
						<p>LightFlix</p>
					</div>
				</Link>
			</NextLink>
			<Spacer />
			<NextLink href='/movies' rel='noopener noreferrer'>
				<Link className={styles.logoCont}>
					<div className={styles.logoText}>
						<p>Movies</p>
					</div>
				</Link>
			</NextLink>
			<Spacer />
			<NextLink href='/cast' rel='noopener noreferrer'>
				<Link className={styles.logoCont}>
					<div className={styles.logoText}>
						<p>Cast</p>
					</div>
				</Link>
			</NextLink>
			<Spacer />
			<NextLink href='/genres' rel='noopener noreferrer'>
				<Link className={styles.logoCont}>
					<div className={styles.logoText}>
						<p>Genres</p>
					</div>
				</Link>
			</NextLink>
			<Spacer />
			<Box>
				<Search
					onChangeHandler={queryHandler}
					query={query}
					placeholder={`Search ${path[1] || 'LightFlix'}`}
				/>
				{!query
					? `Search ${path[1] || 'something'} to begin.`
					: `Searching for ${query}`}
				{!query ? (
					''
				) : (
					<div
						style={{
							marginTop: '2vh',
							position: 'absolute',
							right: 20,
							backgroundColor: '#fff',
							zIndex: 99,
							padding: '2em',
							border: '2px solid gainsboro',
							borderRadius: '15px',
						}}
					>
						<SCard query={query} clickHandler={clickHandler} />
					</div>
				)}
			</Box>
		</Flex>
	);
	return nav;
};

export default NavBar;
