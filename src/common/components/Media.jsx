import {
	Flex,
	Img,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import styles from '../../styles/Home.module.scss';
import randElems from '../utils/getRandElems';
import EmbeddedYT from './EmbeddedYT';

const Media = ({ mostTrendingImages, mostTrendingVideos }) => {
	const mediaMax = 3;
	const [trendingImages, setTrendingImages] = useState([]);

	useEffect(() => {
		setTrendingImages(
			randElems
				.getRandElemsFilter(
					mostTrendingImages ? mostTrendingImages.posters : [],
					mediaMax,
					'iso_639_1',
					'en' || 'fr',
				)[0]
				.slice(0, mediaMax),
		);
	}, [mostTrendingImages]);

	if (!mostTrendingImages || !mostTrendingVideos || !trendingImages) {
		return null;
	} else {
		return (
			<div>
				<Tabs variant='enclosed' mt={24}>
					<TabList>
						<Tab>
							Videos (
							{mostTrendingVideos.length > mediaMax
								? mediaMax
								: mostTrendingVideos.length}
							)
						</Tab>
						<Tab>
							Images (
							{trendingImages.length > mediaMax
								? mediaMax
								: trendingImages.length}
							)
						</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<Flex mt={8} justify='center'>
								<Wrap spacing='2vw'>
									{randElems
										.getRandElems(mostTrendingVideos, mediaMax)
										.map((embbededId) => (
											<WrapItem key={embbededId}>
												<EmbeddedYT embeddedKey={embbededId} />
											</WrapItem>
										))}
								</Wrap>
							</Flex>
						</TabPanel>
						<TabPanel>
							<Flex mt={8} justify='center'>
								<Wrap spacing='2vw'>
									{trendingImages.map((img) => {
										return (
											<WrapItem key={img.file_path.split('/')[1].split('.')[0]}>
												<Img
													src={`https://image.tmdb.org/t/p/w200${img.file_path}`}
													fallbacksrc={'/noMoviePoster.jpg'}
													alt={img.file_path}
													className={styles.responsiveImg}
												/>
											</WrapItem>
										);
									})}
								</Wrap>
							</Flex>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</div>
		);
	}
};

export default Media;
