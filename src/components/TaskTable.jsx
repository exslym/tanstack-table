import { Box } from '@chakra-ui/react';
import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import DATA from '../data';
import EditableCell from './EditableCell';
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
		cell: props => <p>{props.getValue()?.toLocaleTimeString()}</p>,
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
		cell: props => <p>{props.getValue()}</p>,
	},
];

const TaskTable = () => {
	const [data, setData] = useState(DATA);

	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
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
