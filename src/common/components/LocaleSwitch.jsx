import { Radio, RadioGroup, Stack } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const LocaleSwitch = () => {
	const router = useRouter();
	const asPath = router.asPath;
	const pathname = router.pathname;
	const { locales, locale: activeLocale } = router;

	return (
		<div>
			<RadioGroup defaultValue={activeLocale}>
				<Stack spacing={5} direction='row'>
					<Radio
						colorScheme='teal'
						value={locales[0]}
						onClick={() => {
							router.push(pathname, asPath, { locale: 'fr' });
						}}
					>
						{activeLocale === 'fr' ? <b>Français</b> : 'Français'}
					</Radio>
					<Radio
						colorScheme='teal'
						value={locales[1]}
						onClick={() => {
							router.push(pathname, asPath, { locale: 'en' });
						}}
					>
						{activeLocale === 'en' ? <b>English</b> : 'English'}
					</Radio>
				</Stack>
			</RadioGroup>
		</div>
	);
};

export default LocaleSwitch;
