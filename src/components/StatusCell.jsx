import { Box, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { STATUSES } from '../data';

export const ColorIcon = ({ color, ...props }) => (
	<Box w='12px' h='12px' bg={color} borderRadius='3px' {...props} />
);

const StatusCell = ({ getValue, row, column, table }) => {
	const { name, color } = getValue() || {};
	const { updateData } = table.options.meta;

	return (
		<Menu isLazy offset={[0, 0]} flip={false} autoSelect={false}>
			<MenuButton
				h='100%'
				w='100%'
				textAlign='left'
				p={1.5}
				borderLeft={'5px solid'}
				borderLeftColor={color || 'transparent'}
			>
				{name}
			</MenuButton>
			<MenuList className='status-menu'>
				<MenuItem
					onClick={() => updateData(row.index, column.id, null)}
					className='status-menu-item'
				>
					<ColorIcon color='red.400' mr={3} />
					None
				</MenuItem>

				{STATUSES.map(status => (
					<MenuItem
						onClick={() => updateData(row.index, column.id, status)}
						key={status.id}
						className='status-menu-item'
					>
						<ColorIcon color={status.color} mr={3} />
						{status.name}
					</MenuItem>
				))}
			</MenuList>
		</Menu>
	);
};

export default StatusCell;
