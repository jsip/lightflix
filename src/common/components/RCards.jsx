import { Heading, Img, Link, Wrap, WrapItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import checkMediaType from '../lib/checkMediaType';
import getSimilarMedia from '../lib/getSimilarMedia';

const RCards = ({ mediaType, Id, fallbackId }) => {
	const [recommendedMovies, setRecommendedMovies] = useState();
	useEffect(() => {
		getSimilarMedia(mediaType, Id).then((s) => {
			if (s.results.length === 0) {
				getSimilarMedia(mediaType, fallbackId).then((ns) => {
					setRecommendedMovies(ns);
				});
			}
			setRecommendedMovies(s);
		});
	}, [mediaType, Id, fallbackId]);
	if (!recommendedMovies) {
		return null;
	} else {
		console.log(recommendedMovies);
		return (
			<div>
				<Heading mb={6} mt={24}>
					{mediaType === 'tv' || 'movie' ? 'More Like This' : 'Has Played In'}
				</Heading>
				<Wrap direction='row' justify='center' spacing='2vw'>
					{recommendedMovies.results.slice(0, 6).map((movie, i) => (
						<div key={i}>
							<WrapItem>
								<div style={{ position: 'relative' }}>
									<NextLink
										href={checkMediaType('href', mediaType, movie)}
										as={checkMediaType('as', mediaType, movie)}
									>
										<Link>
											<Img
												src={checkMediaType('imgSrc', mediaType, movie, 'w200')}
												fallbacksrc={'/noMoviePoster.jpg'}
												alt=''
												borderRadius='25px'
											></Img>
											<Heading
												size='sm'
												position='absolute'
												bottom='12px'
												left='16px'
												color='white'
												textShadow='0px 0px 3px #000000'
											>
												{checkMediaType('title', mediaType, movie)}
											</Heading>
										</Link>
									</NextLink>
								</div>
							</WrapItem>
						</div>
					))}
				</Wrap>
			</div>
		);
	}
};

export default RCards;
