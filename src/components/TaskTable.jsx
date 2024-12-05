import { Box } from '@chakra-ui/react';
import {
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	useReactTable,
} from '@tanstack/react-table';
import { useState } from 'react';
import DATA from '../data';
import DateCell from './DateCell';
import EditableCell from './EditableCell';
import Filters from './Filters';
import StatusCell from './StatusCell';

const columns = [
	{
		accessorKey: 'task',
		header: 'Task',
		size: 225,
		cell: EditableCell,
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: StatusCell,
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
		state: { columnFilters },
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
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

	console.log(columnFilters);

	return (
		<Box>
			<Filters columnFilters={columnFilters} setColumnFilters={setColumnFilters} />
			<Box className='table' w={table.getTotalSize()}>
				{/* HEADERS */}
				{table.getHeaderGroups().map(headerGroup => (
					<Box className='tr' key={headerGroup.id}>
						{headerGroup.headers.map(header => (
							<Box className='th' w={header.getSize()} key={header.id}>
								{header.column.columnDef.header}
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
		</Box>
	);
};
export default TaskTable;
