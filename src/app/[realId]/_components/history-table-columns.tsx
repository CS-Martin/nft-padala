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
    // {
    //     accessorKey: 'to',
    //     header: ({ column }: { column: any }) => {
    //         return (
    //             <Button
    //                 variant='ghost'
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
    //                 className='flex flex-row justify-between w-full rounded-sm'>
    //                 <ArrowUpDown className='w-4 h-4 ml-2' />
    //             </Button>
    //         );
    //     },
    //     cell: ({ row }: { row: any }) => {
    //         const from = row.original.from;
    //         const to = row.original.to;

    //         const status = from.toLowerCase() === to.toLowerCase() ? 'Delivered' : 'In Progress';

    //         return <div className={`text-sm font-medium ${status === 'Delivered' ? 'text-green-600' : 'text-yellow-600'}`}>{status}</div>;
    //     },
    // },
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
        cell: ({ cell }: { cell: any }) => {
            const timestamp = Number(cell.getValue());
            const date = new Date(timestamp * 1000);

            return (
                <span>
                    {date.toLocaleString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                    })}
                </span>
            );
        },
    },
];
