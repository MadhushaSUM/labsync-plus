"use client"

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import FBSForm from "@/components/investigation-forms/FBSForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { calculateAge } from "@/lib/date-utils";
import { useSelectedInvestigation } from "@/context/SelectedInvestigationContext";
import useGetInvestigationData from "@/hooks/api/investigationData/useGetInvestigationData";
import SerumCalciumForm from "@/components/investigation-forms/SerumCalcium";
import LipidProfileForm from "@/components/investigation-forms/LipidProfile";
import UFRForm from "@/components/investigation-forms/UFRForm";
import FBCForm from "@/components/investigation-forms/FBCForm";

export default function AddDataToInvestigation() {

    const { investigationData } = useSelectedInvestigation();

    if (!investigationData || !investigationData.investigation || !investigationData.investigationRegister) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>
                        <div className="text-red-500">Incomplete data</div>
                    </CardTitle>
                    <CardDescription>
                        Do not use URL to access this page. Always follow the investigation management table
                    </CardDescription>
                </CardHeader>
            </Card>
        )
    }

    const renderForm = () => {
        if (investigationData.investigation) {
            switch (investigationData.investigation.id) {
                case 1:
                    return (
                        <FBSForm
                            patient={investigationData.investigationRegister.patient}
                            investigationRegisterId={investigationData.investigationRegister.id!}
                            investigationId={investigationData.investigation.id}
                        />
                    );
                case 2:
                    return (
                        <SerumCalciumForm
                            patient={investigationData.investigationRegister.patient}
                            investigationRegisterId={investigationData.investigationRegister.id!}
                            investigationId={investigationData.investigation.id}
                        />
                    );
                case 3:
                    return (
                        <LipidProfileForm
                            patient={investigationData.investigationRegister.patient}
                            investigationRegisterId={investigationData.investigationRegister.id!}
                            investigationId={investigationData.investigation.id}
                        />
                    );
                case 4:
                    return (
                        <UFRForm
                            patient={investigationData.investigationRegister.patient}
                            investigationRegisterId={investigationData.investigationRegister.id!}
                            investigationId={investigationData.investigation.id}
                        />
                    );
                case 5:
                    return (
                        <FBCForm
                            patient={investigationData.investigationRegister.patient}
                            investigationRegisterId={investigationData.investigationRegister.id!}
                            investigationId={investigationData.investigation.id}
                        />
                    );
                default:
                    return null;
            }
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
                                    <div className="font-bold text-sm">{investigationData.investigationRegister?.patient.name}</div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-sm w-44">Patient age</div>
                                    <div className="font-bold text-sm">{calculateAge(investigationData.investigationRegister?.patient.dateOfBirth!)}</div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-sm w-44">Investigation date</div>
                                    <div className="font-bold text-sm">{investigationData.investigationRegister?.registeredDate}</div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-sm w-44">Referanced doctor</div>
                                    <div className="font-bold text-sm">{investigationData.investigationRegister?.doctor.name}</div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="text-sm w-44">Investigation</div>
                                    <div className="font-bold text-sm">{investigationData.investigation?.name}</div>
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
                        {renderForm()}
                    </CardHeader>
                </Card>
            </div>
        </div>
    );
}
