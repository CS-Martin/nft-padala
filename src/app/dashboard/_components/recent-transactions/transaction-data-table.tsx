'use client';

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { motion } from 'framer-motion';

import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from '@/components/ui/table';
import { useState } from 'react';
import { PaginationComponent } from '@/components/custom/pagination';
import { abi } from '@/utils/abi';
import { useWalletStore } from '@/stores/wallet.store';
import { useReadContracts } from 'wagmi';
import { Label } from '@/components/ui/label';
import { Abi } from 'viem';
import { TransactionTableColumns } from './transaction-table-columns';
import { useRouter } from 'next/navigation';
import { ItemDetailsResponse } from '@/types/item-details.type';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export default function TransactionDataTable() {
    const walletAddress = useWalletStore((state) => state.walletStatus.address);

    const {
        data: itemDetails,
        isLoading: isLoadingDetails,
        error: errorDetails,
    } = useReadContracts({
        contracts: [
            {
                abi: abi as Abi,
                address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
                functionName: 'getItemDetailsByOriginAddress',
                args: [walletAddress],
            },
        ],
        query: {
            enabled: !!walletAddress,
        },
    });
    console.log('itemDetail', itemDetails);
    const columns = TransactionTableColumns();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <DataTable
                columns={columns}
                data={itemDetails ? itemDetails.flatMap((item) => item.result) : []}
            />
        </motion.div>
    );
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
    const router = useRouter();
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
        <div className='relative overflow-hidden'>
            <div className='overflow-y-auto border rounded'>
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
                                    className='cursor-pointer'
                                    onClick={() => router.push(`/contract?id=${(row.original as ItemDetailsResponse).s_itemIdentifier}`)}
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
                                    No results
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
