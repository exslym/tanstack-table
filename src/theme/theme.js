import { extendTheme } from '@chakra-ui/react';
import styles from './styles';

const config = {
	initialColorMode: 'light',
	useSystemColorMode: true,
};

const theme = extendTheme({
	styles,
	config,
});

export default theme;
