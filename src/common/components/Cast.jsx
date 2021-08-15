import {
	Avatar,
	Badge,
	Box,
	Flex,
	Link,
	Text,
	Tooltip,
	WrapItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

const Cast = ({ castData, returnDesc, disableTooltip }) => {
	const castArr = castData.filter(Boolean).reduce((a, b) => {
		if (!a.find((item) => item.id === b.id)) {
			return a.concat([b]);
		} else {
			return a;
		}
	}, []);
	if (castArr.length === 0) {
		return null;
	} else {
		const cast = castArr.map(
			({ id, name, character, known_for_department, profile_path }) => (
				<div key={id}>
					<NextLink href={`/casts/[cast]`} as={`/casts/${id}`}>
						<Link>
							<Tooltip
								marginTop='1vh'
								hasArrow
								label={`${name} as ${character || 'himself'}`}
								bg='gray.50'
								color='black'
								placement='bottom'
								isDisabled={disableTooltip}
							>
								<WrapItem w='max-content'>
									<Avatar
										name={name}
										src={`https://image.tmdb.org/t/p/original${profile_path}`}
									/>
									{returnDesc ? (
										<Flex ml={2}>
											<Box>
												<Text fontWeight={600}>
													{name.length > 15
														? name.replace(/\s+\w+\s/g, ' ')
														: name}
												</Text>
												<Badge
													textTransform='capitalize'
													width='max-content'
													height='min-content'
													textAlign='center'
												>
													{known_for_department
														? known_for_department
														: 'Unknown'}
												</Badge>
											</Box>
										</Flex>
									) : null}
								</WrapItem>
							</Tooltip>
						</Link>
					</NextLink>
				</div>
			),
		);
		return cast;
	}
};

export default Cast;
