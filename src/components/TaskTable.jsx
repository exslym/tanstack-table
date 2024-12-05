import { Box, Button, ButtonGroup, Icon, Text, useStatStyles } from '@chakra-ui/react';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import DATA from '../data';
import DateCell from './DateCell';
import EditableCell from './EditableCell';
import Filters from './Filters';
import StatusCell from './StatusCell';
import SortIcon from './icons/SortIcon';

const columns = [
	{
		accessorKey: 'task',
		header: 'Task',
		size: 225,
		cell: EditableCell,
		enableColumnFilter: true,
		filterFn: 'includesString',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: StatusCell,
		enableSorting: false,
		enableColumnFilter: true,
		filterFn: (row, columnId, filterStatuses) => {
			if (filterStatuses.length === 0) return true;
			const status = row.getValue(columnId);
			return filterStatuses.includes(status?.id);
		},
	},
	{
		accessorKey: 'due',
		header: 'Due',
		cell: DateCell,
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
		cell: EditableCell,
	},
];

const TaskTable = () => {
	const [data, setData] = useState(DATA);
	const [columnFilters, setColumnFilters] = useState([]);

	const table = useReactTable({
		data,
		columns,
		state: {
			columnFilters,
		},
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		columnResizeMode: 'onChange',
		meta: {
			updateData: (rowIndex, columnId, value) =>
				setData(prev =>
					prev.map((row, index) =>
						index === rowIndex
							? {
									...prev[rowIndex],
									[columnId]: value,
							  }
							: row,
					),
				),
		},
	});

	return (
		<Box>
			<Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
			<Box className='table' w={table.getTotalSize()}>
				{/* HEADERS */}
				{table.getHeaderGroups().map(headerGroup => (
					<Box className='tr' key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<Box className='th' w={header.getSize()} key={header.id}>
								{
									{
										asc: `🔺 `,
										desc: `🔻 `,
									}[header.column.getIsSorted()]
								}
								{header.column.columnDef.header}
								{header.column.getCanSort() && (
									<Icon
										as={SortIcon}
										mx={3}
										fontSize={14}
										onClick={header.column.getToggleSortingHandler()}
									/>
								)}

								<Box
									onMouseDown={header.getResizeHandler()}
									onTouchStart={header.getResizeHandler()}
									className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
								/>
							</Box>
						))}
					</Box>
				))}

				{/* ROWS */}
				{table.getRowModel().rows.map(row => (
					<Box className='tr' key={row.id}>
						{row.getVisibleCells().map(cell => (
							<Box className='td' w={cell.column.getSize()} key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</Box>
						))}
					</Box>
				))}
			</Box>
			<br />
			<Text mb={2}>
				Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
			</Text>
			<ButtonGroup size='sm' isAttached variant='outline'>
				<Button onClick={() => table.previousPage()} isDisabled={!table.getCanPreviousPage()}>
					{'<'}
				</Button>
				<Button onClick={() => table.nextPage()} isDisabled={!table.getCanNextPage()}>
					{'>'}
				</Button>
			</ButtonGroup>
		</Box>
	);
};
export default TaskTable;
