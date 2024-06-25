"use client";

import useAddInvestigationData from "@/hooks/api/investigationData/useAddInvestigationData";
import useGetInvestigationData from "@/hooks/api/investigationData/useGetInvestigationData";
import useUpdateInvestigationData from "@/hooks/api/investigationData/useUpdateInvestigationData";
import { getNormalRangeFlag } from "@/lib/normalRangeFlag";
import { SerumCalciumFormSchema } from "@/schema/InvestigationDataSchema";
import { AddInvestigationDataRequestDto, UpdateInvestigationDataRequestDto } from "@/types/Dto/InvestigationData";
import { InvestigationFormProps } from "@/types/commonTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { serumCalciumNormalRanges } from "./MockNormalRanges";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Input } from "../ui/input";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

type FlagFields = "totalCalciumFlag" | "ionizedCalciumFlag";

export default function SerumCalciumForm({ patient, investigationRegisterId, investigationId }: InvestigationFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [investigationDataId, setInvestigationDataId] = useState(undefined);

    const form = useForm<z.infer<typeof SerumCalciumFormSchema>>({
        resolver: zodResolver(SerumCalciumFormSchema),
        defaultValues:
        {
            totalCalcium: 0,
            totalCalciumFlag: "",
            ionizedCalcium: 0,
            ionizedCalciumFlag: ""
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
                totalCalcium: data[0].totalCalcium,
                totalCalciumFlag: data[0].totalCalciumFlag,
                ionizedCalcium: data[0].ionizedCalcium,
                ionizedCalciumFlag: data[0].ionizedCalciumFlag,
            });
        }
    }, [data, form]);

    const normalRanges = serumCalciumNormalRanges;
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

    function onSubmit(values: z.infer<typeof SerumCalciumFormSchema>) {
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
                Serum Calcium
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-8 w-96">
                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="totalCalcium"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total calcium value</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "totalCalciumFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="totalCalciumFlag"
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
                                                        Total calcium value normal ranges will be displayed here
                                                    </HoverCardContent>
                                                </HoverCard>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="ionizedCalcium"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Ionized calcium value</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "ionizedCalciumFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ionizedCalciumFlag"
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
                                                        Ionized calcium value normal ranges will be displayed here
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