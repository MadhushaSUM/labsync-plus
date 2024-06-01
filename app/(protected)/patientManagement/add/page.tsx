"use client";

import BreadCrumbService from "@/components/breadcrumb/BreadcrumbService";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { NewPatientFormSchema } from "@/schema/PatientSchema";

import { zodResolver } from "@hookform/resolvers/zod"
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useAddPatient from "@/hooks/api/useAddPatient";
import { PatientType } from "@/types/entity/patient";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddEditPatient() {
    const router = useRouter();

    const breadcrumbArr = [
        {
            name: "Home",
            link: "/dashboard"
        },
        {
            name: "Patient management",
            link: "/patientManagement"
        }
    ];
    const currentPageName = "Add new patient";

    const form = useForm<z.infer<typeof NewPatientFormSchema>>({
        resolver: zodResolver(NewPatientFormSchema),
        defaultValues: {
            name: "",
            birth_date: new Date(),
            gender: "Male",
            phone_number: ""
        },
    });

    const { createNewPatient, loading, error } = useAddPatient();
    const [savingPatient, setSavingPatient] = useState(false);

    function onSubmit(values: z.infer<typeof NewPatientFormSchema>) {
        setSavingPatient(true);
        const patient: PatientType = {
            name: values.name,
            birth_date: values.birth_date,
            is_male: values.gender === "Male",
            phone_number: values.phone_number
        };
        const promise = createNewPatient(patient);

        toast.promise(promise, {
            loading: "Creating a patient",
            success: "Patient has been created",
            error: "Error while creating a patient"
        });
        setSavingPatient(false);
        router.push("/patientManagement");
    }

    return (
        <div>
            <div className="apply_shadow">
                <Card>
                    <CardHeader>
                        <CardTitle>Add patient</CardTitle>
                        <CardDescription>
                            Add new patients here
                        </CardDescription>
                    </CardHeader>
                </Card>
            </div>

            <BreadCrumbService breadcrumbArr={breadcrumbArr} currentPageName={currentPageName} />

            <div className="apply_shadow">
                <Card>
                    <CardContent>
                        <div className="my-5">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                                        name="birth_date"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-col">
                                                <FormLabel>Date of birth</FormLabel>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-[240px] pl-3 text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(field.value, "PPP")
                                                                ) : (
                                                                    <span>Pick a date</span>
                                                                )}
                                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <Calendar
                                                            mode="single"
                                                            selected={field.value}
                                                            onSelect={field.onChange}
                                                            disabled={(date) =>
                                                                date > new Date() || date < new Date("1900-01-01")
                                                            }
                                                            initialFocus
                                                        />
                                                    </PopoverContent>
                                                </Popover>
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
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="phone_number"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Patient phone number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Ex: +947012345667" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" size="sm">
                                        {savingPatient ? "Saving" : "Submit"}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}