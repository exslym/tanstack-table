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
		align='center'
		cursor='pointer'
		borderRadius={5}
		fontWeight='bold'
		p={1.5}
		bg={isActive ? 'gray.800' : 'transparent'}
		_hover={{ bg: 'gray.800' }}
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
				<Button size='sm' fontSize={18} leftIcon={<Icon as={FilterIcon} />}>
					Filter
				</Button>
			</PopoverTrigger>

			<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<PopoverBody>
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
