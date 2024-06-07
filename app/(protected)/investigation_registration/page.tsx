"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CirclePlus } from 'lucide-react';
import { useRouter } from "next/navigation";
import { usePagination } from "@/hooks/usePagination";
import { toast } from "sonner";
import { getColumns } from "./columns";
import { useState } from "react";
import { InvestigationRegisterType } from "@/types/entity/investigationRegister";
import useGetInvestigationRegisters from "@/hooks/api/investigationRegister/useGetInvestigationRegisters";
import { DataTable } from "./data-table.expandable";

export default function InvestigationRegistration() {
    const router = useRouter();
    const { limit, onPaginationChange, skip, pagination } = usePagination();
    const [selectedPatients, setSelectedPatients] = useState<InvestigationRegisterType[]>([]);

    const { data, loading, error } = useGetInvestigationRegisters({ limit, skip });
    //const { deleteSelectedPatients} = useDeletePatient();

    if (error) {
        toast.error(error.message);
    }

    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        }
    ];
    const currentPageName = "Investigation registration";

    const handleAddInvestigationRegistryClick = () => {
        router.push("/investigation_registration/add")
    }

    const handleEditInvestigationRegistry = (investigationRegister: InvestigationRegisterType) => {
        console.log("Want to edit?");
        
    };

    // const handleDeleteClick = () => {
    //     const promise = deleteSelectedPatients(selectedPatients.map(patient => patient.id!));
    //     toast.promise(promise, {
    //         loading: "Deleting selected patients",
    //         success: "Patients has been deleted",
    //         error: "Error while deleting patients"
    //     });
    // };

    const columns = getColumns({ onEditInvestigationRegister: handleEditInvestigationRegistry });


    const generateTableActionButtons = () => {
        return (
            <div className="flex flex-row gap-2">
                <Button
                    variant="default"
                    size="sm"
                    onClick={handleAddInvestigationRegistryClick}
                >
                    <div className="flex gap-1">
                        <CirclePlus size={15} />
                        <span>Register new</span>
                    </div>
                </Button>
            </div>
        )
    }

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>Investigation management</CardTitle>
                        <CardDescription>
                            Register new investigations save investiation data here
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />

            <div>
                <Card className="apply_shadow">
                    <CardContent>
                        <div>
                            <DataTable
                                actionButtons={generateTableActionButtons}
                                columns={columns}
                                data={data.content}
                                onPaginationChange={onPaginationChange}
                                pageCount={data.totalPages}
                                pagination={pagination}
                                loading={loading}
                                onRowSelectionChange={setSelectedPatients}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}