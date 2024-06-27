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
import useUpdateInvestigationData from "@/hooks/api/investigationData/useUpdateInvestigationData";
import { InvestigationFormProps } from "@/types/commonTypes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { fbsNormalRanges } from "./MockNormalRanges";
import { getNormalRangeFlag } from "@/lib/normalRangeFlag";

type FlagFields = "fbsValueFlag";

export default function FBSForm({ patient, investigationRegisterId, investigationId }: InvestigationFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [investigationDataId, setInvestigationDataId] = useState(undefined);

    const form = useForm<z.infer<typeof FBSFormSchema>>({
        resolver: zodResolver(FBSFormSchema),
        defaultValues:
        {
            fbsValue: 0,
            fbsValueFlag: ""
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
                fbsValueFlag: data[0].fbsValueFlag,
            });
        }
    }, [data, form]);

    const normalRanges = fbsNormalRanges;
    const handleSetFlag = (field: string, value: number, flagField: FlagFields) => {
        const range = normalRanges.data.find(range => range.fieldName === field)?.normalRanges;

        if (range) {
            const flag = getNormalRangeFlag(patient, range, flagField, value);
            form.setValue(flagField, flag)
        }
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
            <div className="text-lg font-bold justify-center flex">
                Fasting blood sugar
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-8 w-96">
                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="fbsValue"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>FBS value</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "fbsValueFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="fbsValueFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                />

                                                <HoverCard>
                                                    <HoverCardTrigger>
                                                        <InfoCircledIcon color="blue" />
                                                    </HoverCardTrigger>
                                                    <HoverCardContent>
                                                        FBS Value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
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