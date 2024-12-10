import { HStack, Icon, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import FilterPopover from './FilterPopover';
import SearchIcon from './icons/SearchIcon';

const Filters = ({ columnFilters, setColumnFilters }) => {
	const taskName = columnFilters.find(f => f.id === 'task')?.value || '';
	const onFilterChange = (id, value) =>
		setColumnFilters(prev =>
			prev
				.filter(f => f.id !== id)
				.concat({
					id,
					value,
				}),
		);

	return (
		<HStack mb={6} spacing={3}>
			<InputGroup className='input-group' size='sm' maxW='12rem'>
				<InputLeftElement pointerEvents='none'>
					<Icon as={SearchIcon} w={5} h={5} pt={0.5} />
				</InputLeftElement>
				<Input
					type='text'
					variant='filled'
					placeholder='Task Name'
					borderRadius={5}
					value={taskName}
					onChange={e => onFilterChange('task', e.target.value)}
					className='input-search'
				/>
			</InputGroup>
			<FilterPopover columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
		</HStack>
	);
};

export default Filters;
