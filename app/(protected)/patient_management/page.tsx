"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { CirclePlus, Trash2, } from 'lucide-react';
import { useRouter } from "next/navigation";
import { usePagination } from "@/hooks/usePagination";
import useGetPatients from "@/hooks/api/useGetPatients";
import { toast } from "sonner";
import { PatientType } from "@/types/entity/patient";
import { getColumns } from "./columns";

export default function PatientManagement() {
    const router = useRouter();
    const { limit, onPaginationChange, skip, pagination } = usePagination();

    const { data, loading, error } = useGetPatients({ limit, skip });

    if (error) {
        toast.error(error.message);
    }

    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        }
    ];
    const currentPageName = "Patient management";

    const handleAddPatientClick = () => {
        router.push("/patient_management/add")
    }

    const handleEditPatient = (patient: PatientType) => {
        const patientData = encodeURIComponent(JSON.stringify(patient));
        router.push(`/patient_management/add?data=${patientData}&editmode=true`);
    };

    const columns = getColumns({ onEditPatient: handleEditPatient });


    const generateTableActionButtons = () => {
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
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>Patient management</CardTitle>
                        <CardDescription>
                            Manage your patient details here
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
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}