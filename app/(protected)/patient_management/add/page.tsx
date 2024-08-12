"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPatientFormSchema } from "@/schema/PatientSchema";

import { zodResolver } from "@hookform/resolvers/zod"
import { format, formatISO, parseISO } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAddPatient from "@/hooks/api/useAddPatient";
import { PatientType } from "@/types/entity/patient";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import useUpdatePatient from "@/hooks/api/useUpdatePatient";

export default function AddEditPatient() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const editmode = searchParams.get("editmode");
    const data = searchParams.get("data");

    const [patient, setPatient] = useState<PatientType | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        },
        {
            name: "Patient management",
            link: "/patient_management"
        }
    ];
    const currentPageName = "Add new patient";

    const form = useForm<z.infer<typeof NewPatientFormSchema>>({
        resolver: zodResolver(NewPatientFormSchema),
        defaultValues:
        {
            name: "",
            date_of_birth: new Date(),
            gender: "Male",
            contact_number: ""
        }
    });

    useEffect(() => {
        if (data) {
            const patientData: PatientType = JSON.parse(data);
            setPatient(patientData);
            setIsEditMode(editmode === "true");

            form.reset({
                name: patientData.name,
                date_of_birth: patientData.date_of_birth,
                gender: patientData.gender,
                contact_number: patientData.contact_number
            });
        }
    }, [data, editmode, form]);

    const { createNewPatient, errorAdd } = useAddPatient();
    const { updateExistingPatient, errorUpdate } = useUpdatePatient();
    const [savingPatient, setSavingPatient] = useState(false);

    if (errorAdd) {
        toast.error(errorAdd.message);
    }
    if (errorUpdate) {
        toast.error(errorUpdate.message);
    }

    function onSubmit(values: z.infer<typeof NewPatientFormSchema>) {
        setSavingPatient(true);
        const savingPatient: PatientType = {
            name: values.name,
            date_of_birth: formatISO(values.date_of_birth, { representation: 'date' }),
            gender: values.gender,
            contact_number: values.contact_number
        };

        if (isEditMode) {           
            const promise = updateExistingPatient(patient?.id!, savingPatient);
            
            toast.promise(promise, {
                loading: "Updating a patient",
                success: "Patient has been updated",
                error: "Error while updating the patient"
            });
        } else {
            const promise = createNewPatient(savingPatient);

            toast.promise(promise, {
                loading: "Creating a patient",
                success: "Patient has been created",
                error: "Error while creating the patient"
            });
        }
        setSavingPatient(false);
        router.push("/patient_management");
    }

    function onFormCancel() {
        router.push("/patient_management");
    }

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>{isEditMode ? "Edit patient" : "Add patient"}</CardTitle>
                        <CardDescription>
                            {isEditMode ? "Edit patient details here" : "Add new patients here"}
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
                                    <div className="space-y-8 w-96">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Patient name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: Mr. Jack Sparrow" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="date_of_birth"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Patient birth date</FormLabel>
                                                    <FormControl>
                                                        <Input
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
                                            name="gender"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Gender</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select gender" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="Male">Male</SelectItem>
                                                            <SelectItem value="Female">Female</SelectItem>
                                                            <SelectItem value="Other">Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="contact_number"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Patient phone number</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: +947012345667" type="tel" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex flex-row justify-end gap-2">
                                        <Button size="sm" variant="outline" type="reset" onClick={onFormCancel}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" size="sm">
                                            {savingPatient ? "Saving" : "Save patient"}
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