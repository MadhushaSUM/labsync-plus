"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { DoctorType } from "@/types/entity/doctor";
import { NewDoctorFormSchema } from "@/schema/DoctorSchema";
import useAddDoctor from "@/hooks/api/doctors/useAddDoctor";
import useUpdateDoctor from "@/hooks/api/doctors/useUpdateDoctor";

export default function AddEditDoctor() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const editmode = searchParams.get("editmode");
    const data = searchParams.get("data");

    const [doctor, setDoctor] = useState<DoctorType | null>(null);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        },
        {
            name: "Doctor management",
            link: "/doctor_management"
        }
    ];
    const currentPageName = "Add new doctor";

    const form = useForm<z.infer<typeof NewDoctorFormSchema>>({
        resolver: zodResolver(NewDoctorFormSchema),
        defaultValues:
        {
            name: "",
            post: ""
        }
    });

    useEffect(() => {
        if (data) {
            const doctorData: DoctorType = JSON.parse(data);
            setDoctor(doctorData);
            setIsEditMode(editmode === "true");

            form.reset({
                name: doctorData.name,
                post: doctorData.post
            });
        }
    }, [data, editmode, form]);

    const { createNewDoctor, errorAdd } = useAddDoctor();
    const { updateExistingDoctor, errorUpdate } = useUpdateDoctor();
    const [savingDoctor, setSavingDoctor] = useState(false);

    if (errorAdd) {
        toast.error(errorAdd.message);
    }
    if (errorUpdate) {
        toast.error(errorUpdate.message);
    }

    function onSubmit(values: z.infer<typeof NewDoctorFormSchema>) {
        setSavingDoctor(true);
        const savingDoctor: DoctorType = {
            name: values.name,
            post: values.post
        };

        if (isEditMode) {
            savingDoctor.id = doctor?.id;

            const promise = updateExistingDoctor(doctor?.id!, savingDoctor);
            toast.promise(promise, {
                loading: "Updating a doctor",
                success: "Doctor has been updated",
                error: "Error while updating the doctor"
            });
        } else {
            const promise = createNewDoctor(savingDoctor);

            toast.promise(promise, {
                loading: "Creating a doctor",
                success: "Doctor has been created",
                error: "Error while creating the doctor"
            });
        }
        setSavingDoctor(false);
        router.push("/doctor_management");
    }

    function onFormCancel() {
        router.push("/doctor_management");
    }

    return (
        <div>
            <div>
                <Card className="apply_shadow">
                    <CardHeader>
                        <CardTitle>{isEditMode ? "Edit doctor" : "Add doctor"}</CardTitle>
                        <CardDescription>
                            {isEditMode ? "Edit doctor details here" : "Add new doctors here"}
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
                                                    <FormLabel>Doctor name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: Mr. John Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="post"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Doctor post</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Ex: MBBS, Consultant at base hospital Matara" {...field} />
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
                                            {savingDoctor ? "Saving" : "Save doctor"}
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