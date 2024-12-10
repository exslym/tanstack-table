import { Box, Heading } from '@chakra-ui/react';
import TaskTable from './components/TaskTable';
import { ThemeSwitcher } from './components/ThemeSwitcher';

function App() {
	return (
		<Box maxW={1000} mx='auto' p={6} fontSize='1rem'>
			<div className='header'>
				<Heading>TanStack Table</Heading>
				<ThemeSwitcher />
			</div>
			<TaskTable />
		</Box>
	);
}

export default App;
