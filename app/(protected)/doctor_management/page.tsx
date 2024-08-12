"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useGetDoctors from "@/hooks/api/doctors/useGetDoctors";
import { usePagination } from "@/hooks/usePagination";
import { DoctorType } from "@/types/entity/doctor";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { getColumns } from "./columns";
import { CirclePlus } from "lucide-react";
import { DataTable } from "@/components/data-table/data-table";

export default function DoctorManagement() {
    const router = useRouter();
    const { limit, onPaginationChange, offset, pagination } = usePagination();
    const { data, loading, error } = useGetDoctors({ limit, offset });

    const [selectedDoctors, setSelectedDoctors] = useState<DoctorType[]>([]);

    if (error) {
        toast.error(error.message);
    }

    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        }
    ];
    const currentPageName = "Doctor management";

    const handleAddDoctorClick = () => {
        router.push("/doctor_management/add");
    }

    const handleEditDoctor = (patient: DoctorType) => {
        const patientData = encodeURIComponent(JSON.stringify(patient));
        router.push(`/doctor_management/add?data=${patientData}&editmode=true`);
    };

    const columns = getColumns({ onEditDoctor: handleEditDoctor });


    const generateTableActionButtons = () => {
        return (
            <div className="flex flex-row gap-2">
                <Button
                    variant="default"
                    size="sm"
                    onClick={handleAddDoctorClick}
                >
                    <div className="flex gap-1">
                        <CirclePlus size={15} />
                        <span>Add doctor</span>
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
                        <CardTitle>Doctor management</CardTitle>
                        <CardDescription>
                            Manage your doctor details here
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
                                onRowSelectionChange={setSelectedDoctors}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}