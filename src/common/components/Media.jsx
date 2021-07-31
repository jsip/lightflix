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
import React from 'react';
import styles from '../../styles/Home.module.scss';
import randElems from '../utils/getRandElems';
import EmbeddedYT from './EmbeddedYT';

const Media = ({ mostTrendingImages, mostTrendingVideos }) => {
	const mediaMax = 3;
	if (!mostTrendingImages || !mostTrendingVideos) {
		return null;
	} else
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
							{randElems.getRandElemsFilter(
								mostTrendingImages.posters,
								mediaMax,
								'iso_639_1',
								'en' || 'fr',
							)[1].length > mediaMax
								? mediaMax
								: randElems.getRandElemsFilter(
										mostTrendingImages.posters,
										mediaMax,
										'iso_639_1',
										'en' || 'fr',
								  )[1]}
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
									{randElems
										.getRandElemsFilter(
											mostTrendingImages.posters,
											mediaMax,
											'iso_639_1',
											'en' || 'fr',
										)[0]
										.map((img) => {
											return (
												<WrapItem
													key={img.file_path.split('/')[1].split('.')[0]}
												>
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
};

export default Media;
