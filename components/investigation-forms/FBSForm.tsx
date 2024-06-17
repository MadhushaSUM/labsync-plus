"use client"

import { FBSFormSchema } from "@/schema/InvestigationDataSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AddInvestigationDataRequestDto, UpdateInvestigationDataRequestDto } from "@/types/Dto/InvestigationData";
import useAddInvestigationData from "@/hooks/api/investigationData/useAddInvestigationData";
import { toast } from "sonner";
import useGetInvestigationData from "@/hooks/api/investigationData/useGetInvestigationData";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import useUpdateInvestigationData from "@/hooks/api/investigationData/useUpdateInvestigationData";

interface InvestigationFormProps {
    investigationRegisterId: number;
    investigationId: number;
}

export default function FBSForm({ investigationRegisterId, investigationId }: InvestigationFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [investigationDataId, setInvestigationDataId] = useState(undefined);

    const [fbsFlag, setFbsFlag] = useState("Normal");

    const form = useForm<z.infer<typeof FBSFormSchema>>({
        resolver: zodResolver(FBSFormSchema),
        defaultValues:
        {
            fbsValue: 0
        }
    });

    const { data, error } = useGetInvestigationData(
        investigationRegisterId,
        investigationId
    );
    const { updateExistingInvestigationData, errorUpdate } = useUpdateInvestigationData();

    if (error) {
        toast.error(error.message);
    }
    if (errorUpdate) {
        toast.error(errorUpdate.message);
    }

    useEffect(() => {
        if (data && data.length !== 0) {
            setInvestigationDataId(data[0].investigationDataId);

            form.reset({
                fbsValue: data[0].fbsValue,
            });
        }
    }, [data, form]);

    const handleValueChange = (field: string, value: number, setFlag: (value: string) => void) => {
        let flag = "Normal";
        if (field === "fbsValue") {
            flag = value < 75 ? "Low" : value > 120 ? "High" : "Normal";
        }

        setFlag(flag);
    };

    const { saveInvestigationData, errorAdd } = useAddInvestigationData();
    if (errorAdd) {
        toast.error(errorAdd.message);
    }

    function onSubmit(values: z.infer<typeof FBSFormSchema>) {
        setSaving(true);
        
        
        if (investigationDataId) {
            // updating data
            const updateData: UpdateInvestigationDataRequestDto = {
                investigationDataId: investigationDataId,
                investigationRegisterId: investigationRegisterId,
                investigationId: investigationId,
                investigationData: values
            }

            const promise = updateExistingInvestigationData(updateData);

            toast.promise(promise, {
                loading: "Updating investigation data",
                success: "Investigation data has been saved",
                error: "Error while updating investigation data"
            }); 
                   
        } else {
            // saving data as a new record
            const savingData: AddInvestigationDataRequestDto = {
                investigationRegisterId: investigationRegisterId,
                investigationId: investigationId,
                investigationData: values
            };

            const promise = saveInvestigationData(savingData);

            toast.promise(promise, {
                loading: "Saving investigation data",
                success: "Investigation data has been saved",
                error: "Error while saving investigation data"
            }); 
        }

        setSaving(false);
        router.push("/investigation_registration");
    }

    function onFormCancel() {
        router.push("/investigation_registration");
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-8 w-96">
                        <FormField
                            control={form.control}
                            name="fbsValue"
                            render={({ field }) => (
                                <div className="flex flex-row gap-5 items-end">
                                    <FormItem>
                                        <FormLabel>FBS value</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value)
                                                    field.onChange(value)
                                                    handleValueChange("fbsValue", value, setFbsFlag)
                                                    console.log(fbsFlag)
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    <Select value={fbsFlag} onValueChange={setFbsFlag}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Flag</SelectLabel>
                                                <SelectItem value="High">High</SelectItem>
                                                <SelectItem value="Low">Low</SelectItem>
                                                <SelectItem value="Normal">Normal</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        />
                    </div>
                    <div className="flex flex-row justify-end gap-2">
                        <Button size="sm" variant="outline" type="reset" onClick={onFormCancel}>
                            Cancel
                        </Button>
                        <Button type="submit" size="sm">
                            {saving ? "Saving" : "Save data"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}