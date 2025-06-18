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
    },
];
