'use client';

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { motion } from 'framer-motion';

import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from '@/components/ui/table';
import { useEffect, useState } from 'react';
import { PaginationComponent } from '@/components/custom/pagination';
import { abi } from '@/utils/abi';
import { useWalletStore } from '@/stores/wallet.store';
import { useReadContract, useReadContracts } from 'wagmi';
import { Label } from '@/components/ui/label';
import { Abi } from 'viem';
import { TransactionTableColumns } from './transaction-table-columns';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export default function TransactionDataTable() {
    const walletAddress = useWalletStore((state) => state.walletStatus.address);

    /**
     * Fetches all `realId` values associated with a given wallet address from the smart contract.
     *
     * This uses the `getAllRealIdsByAddress` function defined in the contract ABI. Each `realId`
     * is a unique string identifier representing an item or transaction tied to a user's wallet.
     *
     * @returns
     * - `realIds`: An array of real ID strings (e.g. ["uuid1", "uuid2"])
     * - `isLoadingIds`: Boolean indicating loading state
     * - `errorIds`: Error object if request fails
     */
    const {
        data: realIds,
        isLoading: isLoadingIds,
        error: errorIds,
    } = useReadContract({
        abi: abi,
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'getAllRealIdsByAddress',
        args: walletAddress ? [walletAddress] : undefined,
        query: {
            enabled: !!walletAddress, // Ensures query only runs when wallet address is available
        },
    }) as {
        data: string[] | undefined;
        isLoading: boolean;
        error: Error | null;
    };

    /**
     * Fetches item details for each `realId` using the contract function `getItemDetailsByRealId`.
     *
     * This uses `useReadContracts` to batch multiple contract reads. Each real ID results in
     * a separate contract call to fetch the corresponding item details (e.g. name, address, etc).
     *
     * @returns
     * - `itemDetails`: An array of results (tuples) returned by the contract
     * - `isLoadingDetails`: Boolean indicating loading state
     * - `errorDetails`: Error object if any of the batched reads fail
     */
    const {
        data: itemDetails,
        isLoading: isLoadingDetails,
        error: errorDetails,
    } = useReadContracts({
        contracts:
            (realIds as string[])?.map((realId) => ({
                abi: abi as Abi,
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                functionName: 'getItemDetailsByRealId',
                args: [realId],
            })) ?? [],
        query: {
            enabled: !!realIds?.length, // Only run when realIds have been fetched
        },
    });

    useEffect(() => {
        if (isLoadingIds || isLoadingDetails) {
            console.log('⏳ Loading data...');
        }

        if (errorIds) {
            console.error('❌ Failed to fetch real IDs:', errorIds.message);
        }

        if (errorDetails) {
            console.error('❌ Failed to fetch item details:', errorDetails.message);
        }

        if (realIds) {
            console.log('✅ Real IDs:', realIds);
        }

        if (itemDetails) {
            console.log('✅ Item Details:', itemDetails);
        }

        if (!isLoadingIds && !isLoadingDetails && !errorIds && !errorDetails) {
            console.log('✅ All data successfully fetched');
        }
    }, [realIds, itemDetails, errorIds, errorDetails, isLoadingIds, isLoadingDetails]);

    const columns = TransactionTableColumns();

    return (
        <motion.div
            className='px-5 mt-5'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <div className='p-5 border shadow-sm rounded-xl bg-sidebar'>
                <div className='flex flex-row items-center justify-between pb-5 mb-5 border-b'>
                    <div>
                        <h2 className='font-bold'>Dashboard</h2>
                        <Label>Manage user roles, access, and permissions.</Label>
                    </div>
                </div>
                <DataTable
                    columns={columns}
                    data={(itemDetails ?? []).map((item) => item.result)}
                />
            </div>
        </motion.div>
    );
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const pageSize = 10;

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div className='relative overflow-hidden h-[calc(100vh-230px)]'>
            <div className='h-[85%] overflow-y-auto border rounded-lg'>
                <Table>
                    <TableHeader className='sticky top-0 z-10 bg-sidebar'>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className='px-0'>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className='py-3'>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className='text-center h-28'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <PaginationComponent<TData>
                pageSize={pageSize}
                dataLength={data.length}
                table={table}
            />
        </div>
    );
}
