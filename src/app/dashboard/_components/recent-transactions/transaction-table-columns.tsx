/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronsUpDown, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CopyableAddressCell } from './copy-address-cell';

export const TransactionTableColumns = () => [
    {
        accessorKey: 's_itemName',
        header: ({ column }: { column: any }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className='flex flex-row justify-between w-full rounded'>
                    <div className='flex items-center gap-3'>
                        <Package /> Item
                    </div>
                    <ChevronsUpDown />
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
                    className='flex flex-row justify-between w-full rounded'>
                    Owned by
                    <ChevronsUpDown />
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
                    className='flex flex-row justify-between w-full rounded'>
                    Final Recipient
                    <ChevronsUpDown />
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
                    className='flex flex-row justify-between w-full rounded'>
                    Location Origin
                    <ChevronsUpDown />
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
                    className='flex flex-row justify-between w-full rounded'>
                    Status
                    <ChevronsUpDown />
                </Button>
            );
        },
        cell: ({ cell }: { cell: any }) => {
            const value = cell.getValue();
            return value ? (
                <div className='text-green-500 flex flex-row items-center gap-2'>
                    <div className='rounded-full w-2 h-2 bg-green-500'></div>
                    <small>Delivered</small>
                </div>
            ) : (
                <div className='text-orange-500 flex flex-row items-center gap-2'>
                    <div className='rounded-full w-2 h-2 bg-orange-500'></div>
                    <small>In Progress</small>
                </div>
            );
        },
    },
];
