"use client";

import useAddInvestigationData from "@/hooks/api/investigationData/useAddInvestigationData";
import useGetInvestigationData from "@/hooks/api/investigationData/useGetInvestigationData";
import useUpdateInvestigationData from "@/hooks/api/investigationData/useUpdateInvestigationData";
import { getNormalRangeFlag } from "@/lib/normalRangeFlag";
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
import { LipidProfileFormSchema } from "@/schema/InvestigationDataSchema";

type FlagFields = "totalCholesterolFlag" | "hdlCholesterolFlag" | "ldlCholesterolFlag" | "vldlCholesterolFlag" | "triglyceridesFlag";

export default function LipidProfileForm({ patient, investigationRegisterId, investigationId }: InvestigationFormProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [investigationDataId, setInvestigationDataId] = useState(undefined);

    const form = useForm<z.infer<typeof LipidProfileFormSchema>>({
        resolver: zodResolver(LipidProfileFormSchema),
        defaultValues:
        {
            totalCholesterol: 0,
            hdlCholesterol: 0,
            ldlCholesterol: 0,
            vldlCholesterol: 0,
            triglycerides: 0,
            totalCholToHdl: 0,
            totalCholesterolFlag: "",
            hdlCholesterolFlag: "",
            ldlCholesterolFlag: "",
            vldlCholesterolFlag: "",
            triglyceridesFlag: "",
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
                totalCholesterol: data[0].totalCholesterol,
                hdlCholesterol: data[0].hdlCholesterol,
                ldlCholesterol: data[0].ldlCholesterol,
                vldlCholesterol: data[0].vldlCholesterol,
                triglycerides: data[0].triglycerides,
                totalCholToHdl: data[0].totalCholToHdl,
                totalCholesterolFlag: data[0].totalCholesterolFlag,
                hdlCholesterolFlag: data[0].hdlCholesterolFlag,
                ldlCholesterolFlag: data[0].ldlCholesterolFlag,
                vldlCholesterolFlag: data[0].vldlCholesterolFlag,
                triglyceridesFlag: data[0].triglyceridesFlag,
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

    function onSubmit(values: z.infer<typeof LipidProfileFormSchema>) {
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

    function calculateFields(e: React.MouseEvent) {
        e.preventDefault();
        const val = form.getValues("totalCholesterol") / form.getValues("hdlCholesterol");
        form.setValue("totalCholToHdl", val);
    }

    return (
        <div>
            <div className="text-lg font-bold justify-center flex">
                Lipid Profile
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="space-y-8 w-96">
                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="totalCholesterol"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total cholesterol value</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "totalCholesterolFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="totalCholesterolFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                    tabIndex={-1}
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
                                name="hdlCholesterol"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>HDL cholesterol value</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "hdlCholesterolFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="hdlCholesterolFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                    tabIndex={-1}
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

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="triglycerides"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Triglycerides value</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "triglyceridesFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="triglyceridesFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                    tabIndex={-1}
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
                            <div className="flex items-end">
                                <Button onClick={calculateFields} variant={"secondary"}>
                                    Calculate
                                </Button>
                            </div>
                        </div>

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="ldlCholesterol"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>LDL cholesterol value</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "ldlCholesterolFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="ldlCholesterolFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                    tabIndex={-1}
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

                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="vldlCholesterol"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>VLDL cholesterol value</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                    handleSetFlag(field.name, value, "vldlCholesterolFlag");
                                                }}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="vldlCholesterolFlag"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="italic">Flag</FormLabel>
                                        <FormControl>
                                            <div className="flex gap-5 items-center">
                                                <Input
                                                    {...field}
                                                    className="w-[200px]"
                                                    tabIndex={-1}
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
                        <div className="flex gap-5 w-fit">
                            <FormField
                                control={form.control}
                                name="totalCholToHdl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Total cholesterol / HDL cholesterol</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className="w-[200px]"
                                                type="number"
                                                value={field.value}
                                                onChange={(e) => {
                                                    const value = parseFloat(e.target.value);
                                                    field.onChange(value);
                                                }}
                                            />
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
        </div >
    );
}