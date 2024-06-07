"use client"

import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import FBSForm from "@/components/investigation-forms/FBSForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import useGetInvestigationData from "@/hooks/api/investigationData/useGetInvestigationData";
import { calculateAge } from "@/lib/date-utils";
import { InvestigationType } from "@/types/entity/investigation";
import { InvestigationRegisterType } from "@/types/entity/investigationRegister";

export default function AddDataToInvestigation() {
    const searchParams = useSearchParams();
    const passedInvestigationRegister = searchParams.get("data");
    const passedInvestigationId = searchParams.get("investigationId");

    const [investigationRegister, setInvestigationRegister] = useState<InvestigationRegisterType | null>(null);
    const [investigation, setInvestigation] = useState<InvestigationType | null>(null);

    useEffect(() => {
        if (passedInvestigationRegister && passedInvestigationId) {
            try {
                const invReg: InvestigationRegisterType = JSON.parse(passedInvestigationRegister);
                const invId = Number(passedInvestigationId);
                const inv = invReg.investigations.find(i => i.id === invId) || null;

                setInvestigationRegister(invReg);
                setInvestigation(inv);
            } catch (error) {
                toast.error("Invalid data format");
                setInvestigationRegister(null);
                setInvestigation(null);
            }
        } else {
            toast.error("Incomplete data");
            setInvestigationRegister(null);
            setInvestigation(null);
        }
    }, [passedInvestigationRegister, passedInvestigationId]);

    const { data, loading, error } = useGetInvestigationData(
        investigationRegister?.id!,
        investigation?.id!
    );

    if (error) {
        toast.error(error.message);
    }

    const renderForm = () => {
        if (!investigation) return null;
        switch (investigation.id) {
            case 1:
                return (
                    <FBSForm
                        defaultValues={{}}
                        investigationRegisterId={investigationRegister?.id!}
                        investigationId={investigation.id}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>Add data to investigation</CardTitle>
                        <CardDescription>
                            Add data to the selected investigation here
                        </CardDescription>
                        <CardContent>
                            <div className="flex flex-col gap-1 mt-2">
                                <div className="flex flex-row">
                                    <div className="text-sm w-44">Patient name</div>
                                    <div className="font-bold text-sm">{investigationRegister?.patient.name}</div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-sm w-44">Patient age</div>
                                    <div className="font-bold text-sm">{calculateAge(investigationRegister?.patient.dateOfBirth!)}</div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-sm w-44">Investigation date</div>
                                    <div className="font-bold text-sm">{investigationRegister?.registeredDate}</div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-sm w-44">Referanced doctor</div>
                                    <div className="font-bold text-sm">{investigationRegister?.doctor.name}</div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-sm w-44">Investigation</div>
                                    <div className="font-bold text-sm">{investigation?.name}</div>
                                </div>
                            </div>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={[
                { name: "Home", link: "/dashboard" },
                { name: "Investigation registration", link: "/investigation_registration" },
            ]} currentPageName="Add data" />

            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        {!loading && renderForm()}
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}
