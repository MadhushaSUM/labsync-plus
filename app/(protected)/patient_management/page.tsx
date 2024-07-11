"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { CirclePlus, Trash2, } from 'lucide-react';
import { useRouter } from "next/navigation";
import { usePagination } from "@/hooks/usePagination";
import useGetPatients from "@/hooks/api/useGetPatients";
import { toast } from "sonner";
import { PatientType } from "@/types/entity/patient";
import { getColumns } from "./columns";
import { useState } from "react";
import useDeletePatient from "@/hooks/api/useDeletePatient";

export default function PatientManagement() {
    const router = useRouter();
    const { limit, onPaginationChange, skip, pagination } = usePagination();
    const [selectedPatients, setSelectedPatients] = useState<PatientType[]>([]);

    const { data, loading, error } = useGetPatients({ limit, skip });
    const { deleteSelectedPatients} = useDeletePatient();

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

    const handleDeleteClick = () => {
        const promise = deleteSelectedPatients(selectedPatients.map(patient => patient.id!));
        toast.promise(promise, {
            loading: "Deleting selected patients",
            success: "Patients has been deleted",
            error: "Error while deleting patients"
        });
    };

    const columns = getColumns({ onEditPatient: handleEditPatient });

    console.log(data);  

    const generateTableActionButtons = () => {
        return (
            <div className="flex flex-row gap-2">
                <Button
                    variant="default"
                    size="sm"
                    onClick={handleAddPatientClick}
                >
                    <div className="flex gap-1">
                        <CirclePlus size={15} />
                        <span>Add patient</span>
                    </div>
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            size="sm"
                        >
                            <div className="flex gap-1">
                                <Trash2 size={15} />
                                <span>Delete patient</span>
                            </div>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                <div className="flex flex-col gap-5">
                                    <p>
                                        This action cannot be undone. This will permanently delete following
                                        patients and remove all their data from our servers.
                                    </p>
                                    <div className="flex flex-col p-2 rounded-lg text-white bg-red-700">
                                        {selectedPatients.map(patient => {
                                            return (
                                                <div key={patient.id}>
                                                    {patient.name}
                                                </div>
                                            );
                                        })}                                        
                                    </div>
                                </div>
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDeleteClick}>
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
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
                                onRowSelectionChange={setSelectedPatients}
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}