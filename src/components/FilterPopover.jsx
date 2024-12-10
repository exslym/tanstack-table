import {
	Button,
	Flex,
	Icon,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverTrigger,
	Text,
	VStack,
} from '@chakra-ui/react';
import { STATUSES } from '../data';
import FilterIcon from './icons/FilterIcon';
import { ColorIcon } from './StatusCell';

const StatusItem = ({ status, setColumnFilters, isActive }) => (
	<Flex
		className='status-item'
		align='center'
		cursor='pointer'
		borderRadius={5}
		fontWeight='semibold'
		p={1.5}
		bg={isActive ? 'gray.200' : 'transparent'}
		_hover={{ bg: 'gray.200' }}
		onClick={() =>
			setColumnFilters(prev => {
				const statuses = prev.find(filter => filter.id === 'status')?.value;
				if (!statuses) {
					return prev.concat({
						id: 'status',
						value: [status.id],
					});
				}

				return prev.map(f =>
					f.id === 'status'
						? {
								...f,
								value: isActive
									? statuses.filter(s => s !== status.id)
									: statuses.concat(status.id),
						  }
						: f,
				);
			})
		}
	>
		<ColorIcon color={status.color} mr={3} />
		{status.name}
	</Flex>
);

const FilterPopover = ({ columnFilters, setColumnFilters }) => {
	const filterStatuses = columnFilters.find(f => f.id === 'status')?.value || [];

	return (
		<Popover isLazy>
			<PopoverTrigger>
				<Button
					size='sm'
					outline={2}
					border={2}
					borderStyle={'solid'}
					borderColor={'transparent'}
					fontSize={18}
					fontWeight='semibold'
					leftIcon={<Icon as={FilterIcon} />}
					className='filter-button'
				>
					Filter
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverBody className='popover-body'>
					<Text fontSize='md' fontWeight='bold' mb={4}>
						Filter By:
					</Text>
					<Text color='gray.400' fontWeight='bold' mb={1}>
						Status
					</Text>
					<VStack align='flex-start' spacing={1}>
						{STATUSES.map(status => (
							<StatusItem
								status={status}
								key={status.id}
								setColumnFilters={setColumnFilters}
								isActive={filterStatuses.includes(status.id)}
							/>
						))}
					</VStack>
				</PopoverBody>
			</PopoverContent>
		</Popover>
	);
};

export default FilterPopover;
