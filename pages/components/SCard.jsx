import {
	Flex,
	Image,
	Link,
	Box,
	Center,
	Text,
	VStack,
	StackDivider,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import fetchData from '../lib/fetchData';
import API_KEY from '../utils/constants';

const SCard = ({ query, clickHandler }) => {
	let url = `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=`;
	const [searchData, setSearchData] = useState();
	useEffect(() => {
		if (query) {
			fetchData(url, query).then((m) => setSearchData(m));
		}
	}, [query, url]);

	if (!searchData || !query) {
		return null;
	} else if (searchData?.results.length === 0) {
		return 'No movies match your query';
	} else {
		console.log(searchData);
		return searchData?.results.map((data) => (
			<div
				key={data.id}
				style={{
					height: '35vh',
					marginBottom: '1em',
				}}
				onClick={clickHandler}
			>
				<NextLink href='/movies/[movie]' as={`/movies/${data.id}`}>
					<Link>
						<Flex color='white'>
							<Center>
								<Image
									src={
										data.poster_path
											? `https://image.tmdb.org/t/p/w500${data.poster_path}`
											: '/noMoviePoster.jpg'
									}
									alt=''
									style={{
										borderRadius: '10px',
										width: '10vw',
										height: '30vh',
										verticalAlign: 'middle',
									}}
								/>
							</Center>
							<Box
								style={{
									textAlign: 'left',
									color: 'black',
									paddingLeft: '2vw',
									width: '25vw',
								}}
							>
								<h3>{data.title}</h3>
								<p
									style={{
										display: '-webkit-box',
										WebkitLineClamp: 3,
										WebkitBoxOrient: 'vertical',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{data.overview}
								</p>
							</Box>
						</Flex>
					</Link>
				</NextLink>
			</div>
		));
	}
};

export default SCard;
