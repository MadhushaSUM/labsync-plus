"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";

import { CirclePlus, Trash2 } from 'lucide-react';
import { useRouter } from "next/navigation";
import { usePagination } from "@/hooks/usePagination";
import usePatients from "@/hooks/api/usePatients";

export default function PatientManagement() {
    const router = useRouter();
    const { limit, onPaginationChange, skip, pagination } = usePagination();

    const { data, loading, error } = usePatients({ limit, skip });    

    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        }
    ];
    const currentPageName = "Patient management";

    const handleAddPatientClick = () => {
        router.push("/patientManagement/add")
    }

    const generateTableActionButtons = () => {
        console.log(data);
        
        return (
            <div className="flex flex-row gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAddPatientClick}
                >
                    <div className="flex gap-1">
                        <CirclePlus size={15} />
                        <span>Add patient</span>
                    </div>
                </Button>
                <Button
                    variant="destructive"
                    size="sm"
                >
                    <div className="flex gap-1">
                        <Trash2 size={15} />
                        <span>Delete patient</span>
                    </div>
                </Button>
            </div>
        )
    }

    return (
        <div>
            <div className="apply_shadow">
                <Card>
                    <CardHeader>
                        <CardTitle>Patient management</CardTitle>
                        <CardDescription>
                            Manage your patient details here
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />

            <div className="apply_shadow">
                <Card>
                    <CardContent>
                        <div className="container mx-auto py-10">
                            <DataTable
                                actionButtons={generateTableActionButtons}
                                columns={columns}
                                data={data.content}
                                onPaginationChange={onPaginationChange}
                                pageCount={data.totalPages}
                                pagination={pagination}
                                loading={loading}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}