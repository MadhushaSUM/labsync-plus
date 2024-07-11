"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { InvestigationRegisterType } from "@/types/entity/investigationRegister";
import { NewInvestigationRegisterFormSchema } from "@/schema/InvestigationRegister";
import { PatientType } from "@/types/entity/patient";
import useSearchPatientsByName from "@/hooks/api/useSearchPatientsByName";
import SearchBox from "@/components/custom-ui/search-box";
import useSearchDoctorsByName from "@/hooks/api/doctors/useSearchDoctorsByName";
import { DoctorType } from "@/types/entity/doctor";
import { Input } from "@/components/ui/input";
import { format, parseISO } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";

import useAddInvestigationRegister from "@/hooks/api/investigationRegister/useAddInvestigationRegister";
import useUpdateInvestigationRegister from "@/hooks/api/investigationRegister/useUpdateInvestigationRegister";
import { toast } from "sonner";
import { NewInvestigationRegistryRequestDtoType } from "@/types/Dto/InvestigationRegistryDto";
import { investigations } from "@/lib/Investigations";


export default function AddInvestigationRegister() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const editmode = searchParams.get("editmode");
    const data = searchParams.get("data");

    const [investigationRegister, setInvestigationRegister] = useState<InvestigationRegisterType | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        },
        {
            name: "Investigation registration",
            link: "/investigation_registration"
        }
    ];
    const currentPageName = "Register new";

    const form = useForm<z.infer<typeof NewInvestigationRegisterFormSchema>>({
        resolver: zodResolver(NewInvestigationRegisterFormSchema),
        defaultValues:
        {
            patient: {
                name: "",
                dateOfBirth: new Date(),
                contactNumber: "",
                gender: "Male"
            },
            doctor: {
                name: "",
                post: ""
            },
            investigations: [],
            date: new Date(),
            cost: 0
        }
    });

    useEffect(() => {
        if (data) {
            const investigationRegisterData: InvestigationRegisterType = JSON.parse(data);
            setInvestigationRegister(investigationRegisterData);
            setIsEditMode(editmode === "true");

            form.reset({
                patient: investigationRegisterData.patient,
                doctor: investigationRegisterData.doctor,
                investigations: investigationRegisterData.investigations,
                date: parseISO(investigationRegisterData.registeredDate),
                cost: investigationRegisterData.cost
            });
        }
    }, [data, editmode, form]);

    const { createNewInvestigationRegister, errorAdd } = useAddInvestigationRegister();
    const { updateExistingInvestigationRegister, errorUpdate } = useUpdateInvestigationRegister();
    const [savingInvestigationRegister, setSavingInvestigationRegister] = useState(false);

    if (errorAdd) {
        toast.error(errorAdd.message);
        console.log(errorAdd.message);        
    }
    if (errorUpdate) {
        toast.error(errorUpdate.message);
    }

    function onSubmit(values: z.infer<typeof NewInvestigationRegisterFormSchema>) {
        setSavingInvestigationRegister(true);       

        const savingInvestigationRegisterData: NewInvestigationRegistryRequestDtoType = {
            patient_id: selectedPatient!.id!,
            doctor_id: selectedDoctor!.id!,
            investigation_ids: values.investigations.map(investigation => investigation.id),
            investigation_cost: values.cost,
            investigation_date: values.date
        };        

        if (isEditMode) {
            const promise = updateExistingInvestigationRegister(investigationRegister?.id!, savingInvestigationRegisterData);
            toast.promise(promise, {
                loading: "Updating a investigation registration",
                success: "Investigation registration has been updated",
                error: "Error while updating the investigation registration"
            });
        } else {
            const promise = createNewInvestigationRegister(savingInvestigationRegisterData);

            toast.promise(promise, {
                loading: "Creating a investigation register",
                success: "Investigation register has been created",
                error: "Error while creating the investigation register"
            });
        }
        setSavingInvestigationRegister(false);
        router.push("/investigation_registration");
    }

    function onFormCancel() {
        router.push("/investigation_registration");
    }

    const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<DoctorType | null>(null);    

    const { searchPatientData, searchPatientQuery, setSearchPatientQuery, loadingSearchPatients } = useSearchPatientsByName();
    const { searchDoctorData, searchDoctorQuery, setSearchDoctorQuery, loadingSearchDoctors } = useSearchDoctorsByName();        
    
    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>{isEditMode ? "Edit investigation registration" : "Add investigation registration"}</CardTitle>
                        <CardDescription>
                            {isEditMode ? "Edit investigation registration details here" : "Add new investigation registration here"}
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />

            <div>
                <Card className="apply_shadow">
                    <CardContent>
                        <div className="my-5">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)}>
                                    <div className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="patient"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col gap-1">
                                                    <FormLabel>Patient</FormLabel>
                                                    <FormControl>
                                                        <SearchBox
                                                            fieldOnChange={field.onChange}
                                                            generalFieldName="patient"
                                                            selectedValue={selectedPatient}
                                                            setSelectedValue={setSelectedPatient}
                                                            searchQuery={searchPatientQuery}
                                                            searchData={searchPatientData}
                                                            setSearchQuery={setSearchPatientQuery}
                                                            loadingSearchData={loadingSearchPatients}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="doctor"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-col gap-1">
                                                    <FormLabel>Doctor</FormLabel>
                                                    <FormControl>
                                                        <SearchBox
                                                            fieldOnChange={field.onChange}
                                                            generalFieldName="doctor"
                                                            selectedValue={selectedDoctor}
                                                            setSelectedValue={setSelectedDoctor}
                                                            searchQuery={searchDoctorQuery}
                                                            searchData={searchDoctorData}
                                                            setSearchQuery={setSearchDoctorQuery}
                                                            loadingSearchData={loadingSearchDoctors}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="date"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Registration date</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="w-[200px]"
                                                            placeholder="YYYY-MM-DD"
                                                            type="date"
                                                            value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                                                            onChange={(e) => field.onChange(e.target.value && parseISO(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="investigations"
                                            render={() => (
                                                <FormItem>
                                                    <div className="mb-4">
                                                        <FormLabel>Investigations</FormLabel>
                                                        <FormDescription>
                                                            Select the investigations you want to register with the selected patient
                                                        </FormDescription>
                                                    </div>
                                                    <div className="grid grid-cols-4 gap-4">
                                                        {investigations.map((investigation) => (
                                                            <FormField
                                                                key={investigation.id}
                                                                control={form.control}
                                                                name="investigations"
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem
                                                                            key={investigation.id}
                                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    // checked={field.value?.includes(investigation)}
                                                                                    onCheckedChange={(checked) => {
                                                                                        checked ? field.value.push(investigation)
                                                                                        : field.value.filter(inv => inv !== investigation)
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="text-sm font-normal">
                                                                                {investigation.name}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    )
                                                                }}
                                                            />
                                                        ))}
                                                    </div>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="cost"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Registration price</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            className="w-[200px]"
                                                            placeholder="Rs."
                                                            type="number"
                                                            value={field.value}
                                                            onChange={(e) => field.onChange(parseFloat(e.target.value))}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row justify-end gap-2 mt-5">
                                        <Button size="sm" variant="outline" type="reset" onClick={onFormCancel}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" size="sm">
                                            {savingInvestigationRegister ? "Saving" : "Save investigation registration"}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}