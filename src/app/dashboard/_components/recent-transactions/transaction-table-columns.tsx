/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowUpDown, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { shortenedItemId } from '@/lib/utils';
import { CopyableAddressCell } from './copy-address-cell';

export const TransactionTableColumns = () => [
    {
        accessorKey: 's_itemName',
        header: ({ column }: { column: any }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='flex flex-row justify-between w-full rounded-sm'>
                    Item Name
                    <ArrowUpDown className='w-4 h-4 ml-2' />
                </Button>
            );
        },
    },
    {
        accessorKey: 's_originAddress',
        header: ({ column }: { column: any }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='flex flex-row justify-between w-full rounded-sm'>
                    Owner
                    <ArrowUpDown className='w-4 h-4 ml-2' />
                </Button>
            );
        },
        cell: ({ cell }: { cell: any }) => <CopyableAddressCell address={cell.getValue()} />,
    },
    {
        accessorKey: 's_itemIdentifier',
        header: ({ column }: { column: any }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='flex flex-row justify-between w-full rounded-sm'>
                    Item ID
                    <ArrowUpDown className='w-4 h-4 ml-2' />
                </Button>
            );
        },
        cell: ({ cell }: { cell: any }) => <CopyableAddressCell address={cell.getValue()} />,
    },
    {
        accessorKey: 's_finalRecipient',
        header: ({ column }: { column: any }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='flex flex-row justify-between w-full rounded-sm'>
                    Final Recipient
                    <ArrowUpDown className='w-4 h-4 ml-2' />
                </Button>
            );
        },
        cell: ({ cell }: { cell: any }) => <CopyableAddressCell address={cell.getValue()} />,
    },
    {
        accessorKey: 's_locationOrigin',
        header: ({ column }: { column: any }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='flex flex-row justify-between w-full rounded-sm'>
                    Location Origin
                    <ArrowUpDown className='w-4 h-4 ml-2' />
                </Button>
            );
        },
    },
    {
        accessorKey: 's_recipientReached',
        header: ({ column }: { column: any }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='flex flex-row justify-between w-full rounded-sm'>
                    Status
                    <ArrowUpDown className='w-4 h-4 ml-2' />
                </Button>
            );
        },
    },
];
