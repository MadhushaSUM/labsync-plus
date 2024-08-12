"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { SearchIcon } from "lucide-react";
import { Input } from "@/components/custom-ui/custom-input";
import { DataTableViewOptions } from "@/components/data-table/data-table-column-visibility";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { InvestigationRegisterType } from "@/types/entity/investigationRegister";
import { useRouter } from "next/navigation";
import { useSelectedInvestigation } from "@/context/SelectedInvestigationContext";
import { InvestigationType } from "@/types/entity/investigation";
import { investigations } from "@/lib/Investigations";

interface DataTableProps<InvestigationRegisterType> {
    columns: ColumnDef<InvestigationRegisterType>[],
    data: InvestigationRegisterType[],
    onPaginationChange: Dispatch<SetStateAction<{ pageSize: number; pageIndex: number; }>>,
    pageCount: number,
    pagination: { pageSize: number; pageIndex: number; },
    loading: number | boolean | never[],
    actionButtons: () => React.JSX.Element,
    onRowSelectionChange?: (selectedRows: InvestigationRegisterType[]) => void,
}

export function DataTable<TData, TValue>({
    columns,
    data,
    onPaginationChange,
    pageCount,
    pagination,
    loading,
    actionButtons,
    onRowSelectionChange,
}: Readonly<DataTableProps<InvestigationRegisterType>>) {
    const router = useRouter();
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = useState({})

    const { setInvestigationData } = useSelectedInvestigation();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        // THIS IS FOR CLIENT-SIDE PAGINATION
        // getPaginationRowModel: getPaginationRowModel(),
        // THIS IS FOR SERVER-SIDE PAGINATION
        manualPagination: true,
        onPaginationChange,

        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        pageCount,
        state: {
            pagination,
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection
        },
    });

    useEffect(() => {
        if (onRowSelectionChange) {
            const seletedRows = table.getSelectedRowModel().rows.map(row => row.original);
            onRowSelectionChange(seletedRows);
        }
    }, [table, rowSelection, onRowSelectionChange]);

    const handleAddEditData = (investigationRegistration: InvestigationRegisterType, investigation: InvestigationType) => {
        setInvestigationData({
            investigationRegister: investigationRegistration,
            investigation: investigation
        })
        router.push("/investigation_registration/addData");
    }

    return (
        <div>
            <div className="flex items-center py-4 justify-between">
                <Input
                    placeholder="Filter names..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                    startIcon={SearchIcon}
                />
                <div className="flex flex-row gap-2">
                    {actionButtons()}
                    <DataTableViewOptions table={table} />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Loading
                                </TableCell>
                            </TableRow>
                        ) : (
                            table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <Collapsible key={row.id} asChild>
                                        <>
                                            <TableRow
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                            <CollapsibleContent asChild>
                                                <>
                                                    {row.original.investigations.map(investigationId => {
                                                        const investigation = investigations.find(inv => inv.id === investigationId);
                                                        if (investigation) {
                                                            return (
                                                                <TableRow key={investigationId}>
                                                                    <TableCell colSpan={7}>
                                                                        <div className="grid grid-cols-3 gap-5 items-center">
                                                                            <div></div>
                                                                            <div>{investigation.name}</div>
                                                                            <div>
                                                                                <Button
                                                                                    size="sm"
                                                                                    variant="outline"
                                                                                    className="w-24"
                                                                                    onClick={() => handleAddEditData(row.original, investigation)}
                                                                                >
                                                                                    Add data
                                                                                </Button>
                                                                            </div>
                                                                        </div>
                                                                    </TableCell>
                                                                </TableRow>
                                                            );
                                                        }
                                                    })}
                                                </>
                                            </CollapsibleContent>
                                        </>
                                    </Collapsible>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}
