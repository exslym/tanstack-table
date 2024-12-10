import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '../theme-provider';
import './App.css';
import App from './App.jsx';
import theme from './theme/theme.js';

// ReactDOM.createRoot(document.getElementById('root')).render(
// 	<React.StrictMode>
// 		<ChakraProvider theme={theme}>
// 			<App />
// 		</ChakraProvider>
// 	</React.StrictMode>,
// );
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider attribute='class' defaultTheme='light' enableSystem>
			<ChakraProvider theme={theme}>
				<App />
			</ChakraProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
