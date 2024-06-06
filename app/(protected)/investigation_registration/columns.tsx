"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from 'lucide-react';
import { InvestigationRegisterType } from "@/types/entity/investigationRegister";

interface Actions {
    onEditInvestigationRegister: (investigationRegister: InvestigationRegisterType) => void;
}

export const getColumns = (actions: Actions): ColumnDef<InvestigationRegisterType>[] => [
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
        accessorKey: "dateOfBirth",
        header: "Investigations",
    },
    {
        accessorKey: "gender",
        header: "Data added",
    },
    {
        accessorKey: "contactNumber",
        header: "Printed",
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
