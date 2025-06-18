/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CopyableAddressCell } from '@/app/dashboard/_components/recent-transactions/copy-address-cell';

export const HistoryTableColumns = () => [
    {
        accessorKey: 'from',
        header: ({ column }: { column: any }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='flex flex-row justify-between w-full rounded-sm'>
                    Sent from
                    <ArrowUpDown className='w-4 h-4 ml-2' />
                </Button>
            );
        },
        cell: ({ cell }: { cell: any }) => <CopyableAddressCell address={cell.getValue()} />,
    },
    {
        accessorKey: 'to',
        header: ({ column }: { column: any }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='flex flex-row justify-between w-full rounded-sm'>
                    Sent to
                    <ArrowUpDown className='w-4 h-4 ml-2' />
                </Button>
            );
        },
        cell: ({ cell }: { cell: any }) => <CopyableAddressCell address={cell.getValue()} />,
    },
    {
        accessorKey: 'timestamp',
        header: ({ column }: { column: any }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='flex flex-row justify-between w-full rounded-sm'>
                    Timestamp
                    <ArrowUpDown className='w-4 h-4 ml-2' />
                </Button>
            );
        },
    },
];
