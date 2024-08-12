"use client"

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronsUpDown, MoreHorizontal } from 'lucide-react';
import { InvestigationRegisterType } from "@/types/entity/investigationRegister";
import { Badge } from "@/components/ui/badge";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { parseISO } from "date-fns";


interface Actions {
    onEditInvestigationRegister: (investigationRegister: InvestigationRegisterType) => void;
}

export const getColumns = (actions: Actions): ColumnDef<InvestigationRegisterType>[] => [
    {
        id: "expand",
        cell: ({ row }) => (
            <CollapsibleTrigger>
                <div><ChevronsUpDown size={15} /></div>
            </CollapsibleTrigger>
        )
    },
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        enablePinning: true
    },
    {
        accessorKey: "name",
        header: "Patient Name",
        cell: ({ row }) => {
            return (
                <div>{row.original.patient.name}</div>
            );
        }
    },
    {
        accessorKey: "date",
        header: "Investigation date",
        cell: ({ row }) => {
            return (
                <div>{parseISO(row.original.date).toDateString()}</div>
            )
        }
    },
    // {
    //     accessorKey: "investigations",
    //     header: "Investigations",
    //     cell: ({ row }) => {
    //         return (
    //             <div className="flex flex-col">
    //                 {row.original.investigations.map(inv => {
    //                     return (
    //                         <div key={inv.id}>{inv.name}</div>
    //                     );
    //                 })}
    //             </div>
    //         );
    //     }
    // },
    {
        accessorKey: "dataAdded",
        header: "Data added",
        cell: ({ row }) => {
            return (
                row.original.data_added_investigations.length === 0 ? <Badge variant="default">Yes</Badge> : <Badge variant="secondary">No</Badge>
            );
        }
    },
    {
        accessorKey: "printed",
        header: "Printed",
        cell: ({ row }) => {
            return (
                row.original.printed ? <Badge variant="default">Yes</Badge> : <Badge variant="secondary">No</Badge>
            );
        }
    },
    {
        accessorKey: "cost",
        header: () => <div className="text-right">Cost</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("cost"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "LKR",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const investigationRegister = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => actions.onEditInvestigationRegister(investigationRegister)}>
                            Edit investigation registration
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
]

